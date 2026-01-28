exports.emailVerificationTemplate = (otp) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Email Verification</title>
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
                text-align: center;
            }

            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }

            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .otp-box {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #4f46e5;
                margin: 20px 0;
            }

            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 30px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app">
                <img class="logo" src="https://res.cloudinary.com/dfryej1yt/image/upload/v1769185735/EduSphere/fesztk4wmwascixusg0c.png" alt="EduSphere Logo">
            </a>

            <div class="message">Email Verification</div>

            <div class="body">
                <p>Please use the following One-Time Password (OTP) to verify your email address:</p>

                <div class="otp-box">${otp}</div>

                <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                <p>If you did not request this verification, please ignore this email.</p>
            </div>

            <div class="support">
                Need help? Contact us at
                <a href="mailto:info@edusphere.com">info@edusphere.com</a>
            </div>
        </div>
    </body>
    </html>`;
};