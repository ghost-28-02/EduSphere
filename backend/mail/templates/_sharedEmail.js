const HOME_URL = "https://edu-sphere-weld.vercel.app";
const DASHBOARD_URL = "https://edu-sphere-weld.vercel.app/dashboard/enrolled-courses";
const LOGO_URL = "https://res.cloudinary.com/dfryej1yt/image/upload/v1769185735/EduSphere/fesztk4wmwascixusg0c.png";
const SUPPORT_EMAIL = "info@edusphere.com";

const COLORS = {
  primary: "#264653",
  secondary: "#2a9d8f",
  accent: "#e9c46a",
  highlight: "#f4a261",
  coral: "#e76f51",
  bg: "#0f1f27",
  panel: "#152a33",
  panelAlt: "#19313b",
  border: "#29434d",
  text: "#f8fafc",
  muted: "#cbd5e1",
  soft: "#94a3b8",
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatText = (value = "") => escapeHtml(value).replace(/\n/g, "<br />");

const ctaButton = (label, href) => `
  <a href="${href}" style="display:inline-block;background:${COLORS.secondary};color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;line-height:1;border-radius:14px;padding:15px 24px;box-shadow:0 10px 30px rgba(42,157,143,0.24);">
    ${escapeHtml(label)}
  </a>
`;

const secondaryButton = (label, href) => `
  <a href="${href}" style="display:inline-block;background:transparent;color:${COLORS.text};text-decoration:none;font-weight:700;font-size:15px;line-height:1;border-radius:14px;padding:14px 22px;border:1px solid ${COLORS.border};">
    ${escapeHtml(label)}
  </a>
`;

const detailRow = (label, value) => `
  <tr>
    <td style="padding:10px 0;color:${COLORS.soft};font-size:13px;line-height:20px;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;color:${COLORS.text};font-size:14px;line-height:22px;font-weight:600;vertical-align:top;">${value}</td>
  </tr>
`;

const otpBlock = (otp) => `
  <div style="margin:28px 0 20px;text-align:center;">
    <div style="display:inline-block;min-width:240px;border-radius:18px;border:1px solid ${COLORS.border};background:linear-gradient(180deg, ${COLORS.panelAlt} 0%, ${COLORS.panel} 100%);padding:18px 22px;letter-spacing:0.35em;color:${COLORS.accent};font-size:34px;font-weight:800;line-height:1.1;box-shadow:inset 0 1px 0 rgba(255,255,255,0.04);">${escapeHtml(otp)}</div>
  </div>
`;

const shell = ({ preheader, eyebrow, title, intro, body, footerNote, cta, secondaryCta }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 12px !important; }
      .email-card { border-radius: 20px !important; }
      .email-content { padding: 24px 18px !important; }
      .stack { display:block !important; width:100% !important; }
      .stack-gap { margin-top: 12px !important; }
      .center-mobile { text-align:center !important; }
      .mobile-full { width:100% !important; display:block !important; }
      .otp-box { min-width: 0 !important; width: 100% !important; letter-spacing: 0.28em !important; font-size: 30px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:Arial,Helvetica,sans-serif;color:${COLORS.text};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader || title)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLORS.bg};width:100%;border-collapse:collapse;">
    <tr>
      <td align="center" class="email-wrapper" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-card" style="max-width:620px;width:100%;border-collapse:separate;border-spacing:0;border:1px solid ${COLORS.border};border-radius:24px;overflow:hidden;background:${COLORS.panel};box-shadow:0 24px 60px rgba(0,0,0,0.28);">
          <tr>
            <td style="padding:28px 28px 0;" class="email-content">
              <a href="${HOME_URL}" style="text-decoration:none;display:inline-block;">
                <img src="${LOGO_URL}" width="176" alt="EduSphere" style="display:block;border:0;outline:none;text-decoration:none;max-width:176px;width:176px;height:auto;">
              </a>
            </td>
          </tr>
          <tr>
            <td class="email-content" style="padding:24px 28px 30px;">
              ${eyebrow ? `<div style="display:inline-block;border:1px solid rgba(233,196,106,0.3);background:rgba(233,196,106,0.08);color:${COLORS.accent};border-radius:999px;padding:8px 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(eyebrow)}</div>` : ""}
              <h1 style="margin:16px 0 0;font-size:30px;line-height:1.2;font-weight:800;color:${COLORS.text};">${escapeHtml(title)}</h1>
              ${intro ? `<p style="margin:16px 0 0;font-size:16px;line-height:26px;color:${COLORS.muted};">${formatText(intro)}</p>` : ""}
              <div style="margin-top:24px;font-size:15px;line-height:24px;color:${COLORS.muted};">${body || ""}</div>
              ${cta ? `<div style="margin-top:28px;">${cta}</div>` : ""}
              ${secondaryCta ? `<div style="margin-top:14px;">${secondaryCta}</div>` : ""}
              ${footerNote ? `<p style="margin:24px 0 0;font-size:13px;line-height:22px;color:${COLORS.soft};">${formatText(footerNote)}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid ${COLORS.border};width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding-top:20px;font-size:12px;line-height:20px;color:${COLORS.soft};">
                    <div style="font-weight:700;color:${COLORS.text};margin-bottom:4px;">EduSphere</div>
                    Need help? Email <a href="mailto:${SUPPORT_EMAIL}" style="color:${COLORS.accent};text-decoration:none;">${SUPPORT_EMAIL}</a>
                    <div style="margin-top:8px;">This email was sent from a transactional notification workflow. Please do not reply directly to this address.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

module.exports = {
  COLORS,
  HOME_URL,
  DASHBOARD_URL,
  SUPPORT_EMAIL,
  escapeHtml,
  formatText,
  ctaButton,
  secondaryButton,
  detailRow,
  otpBlock,
  shell,
};