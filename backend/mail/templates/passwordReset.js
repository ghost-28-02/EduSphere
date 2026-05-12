const { ctaButton, shell } = require("./_sharedEmail");

exports.passwordResetTemplate = (resetUrl) => {
    return shell({
        preheader: "Reset your EduSphere password with the secure link below.",
        eyebrow: "Password reset",
        title: "Reset your password",
        intro: "We received a request to reset your EduSphere password. If this was you, use the secure link below to create a new password.",
        body: `
            <div style="background:#19313b;border:1px solid #29434d;border-radius:18px;padding:20px;">
                <p style="margin:0;color:#cbd5e1;line-height:24px;">For your security, this reset link is temporary and can only be used once.</p>
                <p style="margin:14px 0 0;color:#f8fafc;line-height:24px;"><strong style="color:#e9c46a;">Link expires in 5 minutes.</strong></p>
            </div>
        `,
        cta: ctaButton("Reset Password", resetUrl),
        secondaryCta: `<div style="text-align:center;"><a href="${resetUrl}" style="color:#94a3b8;font-size:13px;line-height:20px;word-break:break-all;">If the button does not work, copy and paste this link into your browser.</a></div>`,
        footerNote: "If you did not request this change, no action is required and your password will remain unchanged.",
    });
};