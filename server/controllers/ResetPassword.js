const User = require("../models/User");
const mailSender = require("../utils/mailSender");
<<<<<<< HEAD
const bcrypt = require("bcrypt");
const { passwordResetTemplate } = require("../mail/templates/passwordReset");
=======
const bcrypt = require("bcrypt")
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b

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
<<<<<<< HEAD
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
=======
                resetPasswordExpires: Date.now() + 5 * 60
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
            },
            {
                new: true
            }
        )
        const url = `http://localhost:3000/update-password/${token}`;

<<<<<<< HEAD
        await mailSender(
            email,
            "Reset Your Password - EduSphere",
            passwordResetTemplate(url)
=======
        const mailBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Password Reset Request</h2>
                <p>Hello,</p>

                <p>
                    We received a request to reset your password for your
                    <strong>EduSphere</strong> account.
                </p>

                <p>
                    Click the button below to reset your password:
                </p>

                <a href="${url}" 
                style="
                        display: inline-block;
                        padding: 12px 20px;
                        background-color: #4CAF50;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                ">
                    Reset Password
                </a>

                <p style="margin-top: 20px;">
                    This link will expire in <strong>5 minutes</strong>.
                </p>

                <p>
                    If you did not request this, please ignore this email.
                </p>

                <br/>

                <p>
                    Regards,<br/>
                    <strong>EduSphere Team</strong>
                </p>
            </div>
        `;

        await mailSender(
            email,
            "Reset Your Password - EduSphere",
            mailBody
>>>>>>> 04c45250e25853284f0d36bcfd7ff6937054727b
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
