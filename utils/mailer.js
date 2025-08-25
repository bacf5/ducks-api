require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmail = async (email, apiKey) => {
  try {
    const mailOptions = {
      from: {
        name: 'Ducks API',
        address: 'ducksapi@gmail.com',
      },
      to: email,
      subject: 'Welcome to Ducks API',
      text: 'Hello world',
      html: `  <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:auto; background:#fff; border:1px solid #ddd; border-radius:8px;">
      <tr>
        <td style="padding:20px;">
          <h2 style="margin:0 0 10px; color:#333;">Welcome to Ducks API 🦆</h2>
          <p style="margin:0 0 16px; color:#555; font-size:14px;">
            Hi <strong>dear user</strong>, thanks for subscribing to our API!
          </p>

          <p style="margin:0 0 6px; font-size:14px; color:#333;">Here’s your API key:</p>
          <div style="background:#81b29a; padding:10px; border-radius:6px; font-family: monospace; font-size:13px; color:#111;">
            ${apiKey}
          </div>
          <br/>
          <div><p style="margin:0 0 16px; color:#555; font-size:14px;">
            Remember to send in your header request the API key provided.
          </p></div>

          <p style="margin:16px 0 0; font-size:11px; color:#666;">
            Keep this key safe. You’ll use it to authenticate your API requests. Remember you have 500 credits per month, if you need more don't hesitate to ask!
          </p>
        </td>
      </tr>
    </table>
  </body>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email', error);
  }
};

module.exports = sendEmail;
