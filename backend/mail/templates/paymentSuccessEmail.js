const { DASHBOARD_URL, detailRow, ctaButton, shell } = require("./_sharedEmail");

exports.paymentSuccessEmailTemplate = ({
  name,
  Amount,
  currency = "INR",
  orderId,
  paymentId,
}) => {
  return shell({
    preheader: `Payment received for ${currency} ${Amount}`,
    eyebrow: "Payment confirmed",
    title: "Your payment was successful",
    intro: `Hi ${name || "Learner"}, your payment has been processed successfully. Your receipt details are below.`,
    body: `
      <div style="background:#19313b;border:1px solid #29434d;border-radius:18px;padding:20px;">
        <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;font-weight:700;">Amount paid</div>
        <div style="margin-top:8px;font-size:30px;line-height:1.1;font-weight:800;color:#e9c46a;">${currency} ${Amount}</div>
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:16px;border-collapse:collapse;background:#19313b;border:1px solid #29434d;border-radius:18px;padding:0 18px;">
        ${detailRow("Order ID", orderId || "-")}
        ${detailRow("Payment ID", paymentId || "-")}
      </table>
    `,
    cta: ctaButton("Go to Dashboard", DASHBOARD_URL),
    footerNote: "Your payment receipt is stored in your account history for future reference.",
  });
};