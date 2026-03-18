const { contactUsTemplate } = require("../mail/templates/contactUsAdmin");
const { contactUsAutoReplyTemplate } = require("../mail/templates/contactUsUser");
const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact");
const User = require("../models/User")

exports.contactUsController = async (req, res) => {
    try {
        const { firstName, lastName, email, message, phoneNo, countryCode } = req.body;

        if (!firstName || !lastName || !email || !message || !phoneNo || !countryCode) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        await Contact.create({
            firstName,
            lastName,
            email,
            phoneNo,
            countryCode,
            message,
        });

        const admins = await User.find({ accountType: "Admin" });

        const fullName = `${firstName} ${lastName}`;

        await mailSender(
            email,
            "We received your message",
            contactUsAutoReplyTemplate(firstName)
        );

        await Promise.all(
            admins.map((admin) =>
                mailSender(
                    admin.email,
                    "New Contact Us Submission",
                    contactUsTemplate({
                        firstName,
                        lastName,
                        email,
                        phoneNo,
                        countryCode,
                        message,
                    })
                )
            )
        );

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully",
        });

    } catch (error) {
        console.error("Error in Contact Us:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to submit contact form",
            error: error.message,
        });
    }
};
