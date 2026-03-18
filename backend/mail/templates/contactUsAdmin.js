exports.contactUsTemplate = ({
  firstName,
  lastName,
  email,
  phoneNo,
  countryCode,
  message,
}) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>New Contact Request</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }

      .logo {
        max-width: 180px;
        margin-bottom: 20px;
      }

      .heading {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }

      .field {
        margin-bottom: 12px;
      }

      .label {
        font-weight: bold;
        color: #555555;
      }

      .value {
        margin-top: 4px;
      }

      .message-box {
        background-color: #f9fafb;
        border-left: 4px solid #4f46e5;
        padding: 15px;
        margin-top: 10px;
        white-space: pre-wrap;
      }

      .footer {
        font-size: 14px;
        color: #999999;
        margin-top: 30px;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <a href="https://studynotion-edtech-project.vercel.app">
        <img
          class="logo"
          src="https://res.cloudinary.com/dfryej1yt/image/upload/v1769185735/EduSphere/fesztk4wmwascixusg0c.png"
          alt="EduSphere Logo"
        />
      </a>

      <div class="heading">New Contact Us Submission</div>

      <div class="field">
        <div class="label">Name</div>
        <div class="value">${firstName} ${lastName}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value">${email}</div>
      </div>

      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${countryCode || ""} ${phoneNo || "N/A"}</div>
      </div>

      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message}</div>
      </div>

      <div class="footer">
        This message was submitted via the EduSphere Contact Us form.
      </div>
    </div>
  </body>
  </html>`;
};