const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//send OTP
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(409).json({
                success: false,
                message: "User is already registered"
            })
        }

        let otp;
        let isUnique = false;

        while (!isUnique) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            const existingOtp = await OTP.findOne({ otp });
            if (!existingOtp) {
                isUnique = true;
            }
        }

        const otpBody = await OTP.create({email, otp});
        console.log(otpBody);
        
        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })

    } catch (error) {
        console.log("Error in sendOtp: ",error);
        return res.status(500).json({
            success: false,
            message: "Unable to send OTP",
            error: error.message
        });
    }
}

// signUp
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success: false,
                message: "firstName, lastName, email, password, confirmPassword, and otp are required"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User is already registered"
            });
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length == 0){
            return res.status(404).json({
                success: false,
                message: "No OTP found for this email"
            })
        }  else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.log("Error in signup",error);
        return res.status(500).json({
            success: false,
            message: "Unable to register user",
            error: error.message
        });
        
    }
}

//login
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not registered, please sign up first"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            })
        }

    } catch (error) {
        console.log("Error in login: ",error);
        return res.status(500).json({
            success: false,
            message: "Unable to log in",
            error: error.message
        })
    }
}

//changedPassword
exports.changePassword = async (req, res) => {
    try {
        // 1. Get data from request body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.user.id;

        // 2. Validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "oldPassword, newPassword, and confirmNewPassword are required",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirmation do not match",
            });
        }

        // 3. Get user from DB
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 4. Check old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // 5. Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 6. Update password in DB
        user.password = hashedPassword;
        await user.save();

        // 7. Send confirmation email
        const mailResponse = await mailSender(
            user.email,
            "Password Changed Successfully",
            `
            <div style="font-family: Arial, sans-serif;">
                <h2>Password Updated</h2>
                <p>Hello ${user.name || "User"},</p>
                <p>Your password has been changed successfully.</p>
                <p>If this was not you, please contact support immediately.</p>
                <br/>
                <p>Regards,<br/>EduSphere Team</p>
            </div>
            `
        );

        console.log("Email sent successfully: ", mailResponse);

        // 8. Return response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.log("Error in changePassword:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to change password",
        });
    }
};
