const { detailRow, formatText, shell } = require("./_sharedEmail");

exports.contactUsTemplate = ({
  firstName,
  lastName,
  email,
  phoneNo,
  countryCode,
  message,
}) => {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Unknown Sender";

  return shell({
    preheader: `New contact request from ${fullName}`,
    eyebrow: "New inquiry",
    title: "Contact form submission received",
    intro: "A visitor has sent a new message through the EduSphere contact form. The details below can help your team follow up quickly.",
    body: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;background:#19313b;border:1px solid #29434d;border-radius:18px;padding:0 18px;">
        ${detailRow("Name", formatText(fullName))}
        ${detailRow("Email", `<a href="mailto:${email}" style="color:#e9c46a;text-decoration:none;">${email}</a>`)}
        ${detailRow("Phone", formatText(`${countryCode || ""} ${phoneNo || "N/A"}`.trim()))}
        <tr>
          <td style="padding:10px 0 12px;color:#94a3b8;font-size:13px;line-height:20px;width:34%;vertical-align:top;">Message</td>
          <td style="padding:10px 0 12px;color:#f8fafc;font-size:14px;line-height:22px;vertical-align:top;">
            <div style="background:#13252d;border:1px solid #29434d;border-radius:14px;padding:16px;white-space:pre-wrap;">${formatText(message || "No message provided.")}</div>
          </td>
        </tr>
      </table>
    `,
    footerNote: "This alert is internal only and was generated from the public contact form.",
  });
};