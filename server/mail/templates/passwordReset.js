exports.passwordResetTemplate = (resetUrl) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
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

            .highlight {
                font-weight: bold;
                color: #4f46e5;
            }

            .cta {
                display: inline-block;
                padding: 12px 20px;
                background-color: #4f46e5;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                margin-top: 20px;
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
                <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="EduSphere Logo">
            </a>

            <div class="message">Password Reset Request</div>

            <div class="body">
                <p>You requested to reset your account password.</p>

                <p>
                    Click the button below to set a new password.
                </p>

                <a class="cta" href="${resetUrl}">
                    Reset Password
                </a>

                <p style="margin-top: 20px;">
                    This link will expire in <span class="highlight">5 minutes</span>.
                </p>

                <p>
                    If you did not request this password reset, please ignore this email.
                </p>
            </div>

            <div class="support">
                Need help? Contact us at
                <a href="mailto:info@edusphere.com">info@edusphere.com</a>
            </div>
        </div>
    </body>
    </html>`;
};