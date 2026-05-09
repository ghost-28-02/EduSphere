const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
    try {

        const response = await resend.emails.send({
            from: process.env.MAIL_USER,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully");
        console.log(response);

        return response;

    } catch (error) {

        console.log("Issue in mailSender");
        console.log(error);

        throw error;
    }
};

module.exports = mailSender;