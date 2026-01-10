exports.courseEnrollmentTemplate = (courseName, name) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Course Enrollment Confirmation</title>
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

            <div class="message">Course Enrollment Confirmation</div>

            <div class="body">
                <p>Dear ${name},</p>

                <p>
                    You have successfully enrolled in the course:
                </p>

                <p class="highlight">${courseName}</p>

                <p>
                    You can now access all course materials and start learning from your dashboard.
                </p>

                <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">
                    Go to Dashboard
                </a>
            </div>

            <div class="support">
                Need help? Contact us at
                <a href="mailto:info@edusphere.com">info@edusphere.com</a>
            </div>
        </div>
    </body>
    </html>`;
};