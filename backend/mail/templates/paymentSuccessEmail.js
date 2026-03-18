exports.paymentSuccessEmailTemplate = ({
  name,
  Amount,
  currency = "INR",
  orderId,
  paymentId,
}) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Payment सफल रहा</title>
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

      .details {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        text-align: left;
      }

      .row {
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
        font-size: 14px;
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
        <img class="logo" src="https://res.cloudinary.com/dfryej1yt/image/upload/v1769185735/EduSphere/fesztk4wmwascixusg0c.png" alt="EduSphere Logo">
      </a>

      <div class="message">Payment Successful</div>

      <div class="body">
        <p>Hi ${name || "Learner"},</p>
        <p>Your payment is successful.</p>
        <p>Amount Paid: <span class="highlight">${currency} ${Amount}</span></p>

        <div class="details">
          <div class="row"><span>Order ID is: </span><span> ${orderId || "-"}</span></div>
          <div class="row"><span>Payment ID is: </span><span> ${paymentId || "-"}</span></div>
        </div>

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