const { otpBlock, shell } = require("./_sharedEmail");

exports.emailVerificationTemplate = (otp) => {
    return shell({
        preheader: `Your EduSphere verification code is ${otp}`,
        eyebrow: "Email verification",
        title: "Verify your email address",
        intro: "Use the one-time password below to verify your email address and complete your account setup.",
        body: `
            ${otpBlock(otp)}
            <p style="margin:0;color:#cbd5e1;line-height:24px;text-align:center;">This code expires in <strong style="color:#e9c46a;">5 minutes</strong>.</p>
            <p style="margin:12px 0 0;color:#94a3b8;line-height:24px;text-align:center;">If you did not request this verification, you can safely ignore this email.</p>
        `,
        footerNote: "Use the code only on EduSphere and never share it with anyone.",
    });
};