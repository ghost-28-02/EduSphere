const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});

async function sendVerificationMail(email, otp) {
    try {

        const mailBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Email Verification</h2>
                <p>Dear User,</p>
                <p>
                    Thank you for registering with <strong>EduSphere</strong>.
                    Please use the following One-Time Password (OTP) to verify your email address:
                </p>

                <div style="
                    font-size: 22px;
                    font-weight: bold;
                    letter-spacing: 4px;
                    margin: 20px 0;
                    color: #2c3e50;
                ">
                    ${otp}
                </div>

                <p>
                    This OTP is valid for the next <strong>5 minutes</strong>.
                    Please do not share this OTP with anyone.
                </p>

                <p>
                    If you did not request this verification, please ignore this email.
                </p>

                <br/>

                <p>
                    Regards,<br/>
                    <strong>EduSphere Team</strong>
                </p>
            </div>
        `;

        const mailResponse = await mailSender(email, "Email Verification - EduSphere", mailBody);
        console.log("Email sent successfully: ", mailResponse);

    } catch (error) {
        console.log("Issue in sendVerificationMail");
        console.log(error.message);
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationMail(this.email, this.otp);
})

module.exports = mongoose.model("OTP", OTPSchema);