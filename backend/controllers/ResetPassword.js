const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const { passwordResetTemplate } = require("../mail/templates/passwordReset");


exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Your email is not registered with us"
            })
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate(
            {
                email: email
            },
            {
                token: token,
                resetPasswordExpires: Date.now() + 10 * 60 * 1000
            },
            {
                new: true
            }
        )
        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;


        await mailSender(
            email,
            "Reset Your Password - EduSphere",
            passwordResetTemplate(url)
        );
        
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check email and change password "
        })

    } catch (error) {
        console.log("Error in resetPasswordToken", error);
        return res.status(400).json({
            success: false,
            message: "Error in resetPasswordToken generator"
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            });
        }

        const userDetails = await User.findOne({token: token});

        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Token Invalid"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                message: false,
                message: "Token is expired, please regenerate your token"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {
                token: token
            },
            {
                password: hashedPassword
            },
            {
                new: true
            }
        )

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log("Error in reset Password", error);
        return res.status(500).json({
            success: false,
            message: "Error in resetPassword",
            error: error.message
        });
    }
}
