const { shell } = require("./_sharedEmail");

exports.contactUsAutoReplyTemplate = (firstName) => {
  const safeName = firstName || "there";

  return shell({
    preheader: "We received your message and will reply soon.",
    eyebrow: "Message received",
    title: `Thanks for reaching out, ${safeName}!`,
    intro: "We have received your message and our team is reviewing it now. You can expect a response as soon as possible.",
    body: `
      <div style="background:#19313b;border:1px solid #29434d;border-radius:18px;padding:18px;color:#cbd5e1;">
        We appreciate you contacting EduSphere. If your message is urgent, please reply to this email with the word <strong style="color:#e9c46a;">urgent</strong> in the subject line so we can prioritize it.
      </div>
    `,
    footerNote: "We appreciate your patience while our team responds.",
  });
};