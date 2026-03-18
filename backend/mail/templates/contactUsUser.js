exports.contactUsAutoReplyTemplate = (firstName) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>We Received Your Message</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      .logo {
        max-width: 180px;
        margin-bottom: 20px;
      }

      .title {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .text {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .footer {
        font-size: 14px;
        color: #999999;
        margin-top: 30px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <img
        class="logo"
        src="https://res.cloudinary.com/dfryej1yt/image/upload/v1769185735/EduSphere/fesztk4wmwascixusg0c.png"
        alt="EduSphere Logo"
      />

      <div class="title">Thanks for contacting us, ${firstName}!</div>

      <div class="text">
        We've received your message and our team will get back to you shortly.
      </div>

      <div class="footer">
        © EduSphere — All rights reserved
      </div>
    </div>
  </body>
  </html>`;
};