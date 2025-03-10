const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail as the service
  auth: {
    user: process.env.EMAIL_USER,  // Your email address (configured in .env file)
    pass: process.env.EMAIL_PASS,  // Your email password or app password (use app password for Gmail)
  },
  tls: {
    rejectUnauthorized: false,  // Disables certificate validation for self-signed certificates
  },
});

// Function to send email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender's email address
    to: to,                       // Recipient's email address
    subject: subject,             // Email subject
    text: text,                   // Plain text version of the email body
    html: html,                   // HTML version of the email body
  };

  // Send the email
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
