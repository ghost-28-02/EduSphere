const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const { emailVerificationTemplate } = require("../mail/templates/emailVerification");

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
        expires: '10m',
    }
});

async function sendVerificationMail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Email Verification - EduSphere", emailVerificationTemplate(otp));
        console.log("Email sent successfully: ", mailResponse);

    } catch (error) {
        console.log("Issue in sendVerificationMail");
        console.log(error);
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationMail(this.email, this.otp);
})

module.exports = mongoose.model("OTP", OTPSchema);