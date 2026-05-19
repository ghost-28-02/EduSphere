const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const mailSender = async (email, title, body) => {
    try {

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.sender = {
            email: process.env.BREVO_SENDER_EMAIL,
            name: process.env.BREVO_SENDER_NAME || "EduSphere",
        };
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;

        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("Email sent successfully");

        return response;

    } catch (error) {

        console.log("Issue in mailSender");
        console.log(error);

        throw error;
    }
};

module.exports = mailSender;