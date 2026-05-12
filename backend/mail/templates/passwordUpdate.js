const { shell } = require("./_sharedEmail");

exports.passwordUpdatedTemplate = (email, name) => {
    return shell({
        preheader: "Your EduSphere password has been updated.",
        eyebrow: "Security alert",
        title: "Your password was updated",
        intro: `Hi ${name || "there"}, your EduSphere password has been changed successfully for ${email}.`,
        body: `
            <div style="background:rgba(231,111,81,0.12);border:1px solid rgba(231,111,81,0.28);border-radius:18px;padding:18px;">
                <p style="margin:0;color:#f8fafc;line-height:24px;"><strong style="color:#e76f51;">If you did not make this change, please secure your account immediately.</strong> Contact support and update your password again from a trusted device.</p>
            </div>
        `,
        footerNote: "This notification helps protect your account by confirming security changes in real time.",
    });
};