const nodemailer = require('nodemailer');
require('dotenv').config()

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: (process.env.MAIL_SECURE === 'true') || (process.env.MAIL_PORT === '465'),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        logger: true,
        debug: true
    })
}

const mailSender = async (email, title, body) => {
    try {
        const transporter = createTransporter();

        // verify connection configuration (fails fast with useful logs)
        try {
            await transporter.verify();
            console.log('SMTP connection verified');
        } catch (verifyErr) {
            console.error('SMTP verify failed:', verifyErr);
            throw verifyErr;
        }

        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM || '"EduSphere | Web Dev - Sachin" <noreply@EduSphere.com>',
            to: email,
            subject: title,
            html: body
        })

        console.log('Message sent: %s', info.messageId)
        return info

    } catch (error) {
        console.error('Issue in mailSender:', error)
        throw error
    }
}

module.exports = mailSender;