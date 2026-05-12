const { DASHBOARD_URL, ctaButton, shell } = require("./_sharedEmail");

exports.courseEnrollmentTemplate = (courseName, name) => {
    return shell({
        preheader: `You are enrolled in ${courseName}`,
        eyebrow: "Enrollment confirmed",
        title: `Welcome to ${courseName}`,
        intro: `Hi ${name || "Learner"}, your enrollment is confirmed. You now have access to the course content and can begin learning right away.`,
        body: `
            <div style="background:#19313b;border:1px solid #29434d;border-radius:18px;padding:20px;">
                <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;font-weight:700;">Course</div>
                <div style="margin-top:8px;font-size:20px;line-height:30px;font-weight:800;color:#e9c46a;">${courseName}</div>
                <p style="margin:14px 0 0;color:#cbd5e1;line-height:24px;">You can return to this course anytime from your dashboard. Your progress will be saved as you move through the lessons.</p>
            </div>
        `,
        cta: ctaButton("Open Dashboard", DASHBOARD_URL),
        footerNote: "If you need help accessing the course, contact support and include the course name for faster assistance.",
    });
};