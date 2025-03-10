const express = require('express');
const router = express.Router();
const sendEmail = require('../services/mailer');

// Route to handle form submission
router.post('/send-email', async (req, res) => {
  const {
    companyName,
    Name,
    EmailID,
    Street,
    City,
    State,
    Country,
    ZipCode,
    phoneNumber,
    message
  } = req.body;

  // Formatting the email message with the provided form data for HTML version
  const emailMessage = `
    <h1>Form Submission Details</h1>
    <p><strong>Company Name:</strong> ${companyName}</p>
    <p><strong>Name:</strong> ${Name}</p>
    <p><strong>Email ID:</strong> ${EmailID}</p>
    <p><strong>Street:</strong> ${Street}</p>
    <p><strong>City:</strong> ${City}</p>
    <p><strong>State:</strong> ${State}</p>
    <p><strong>Country:</strong> ${Country}</p>
    <p><strong>Zip Code:</strong> ${ZipCode}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  // Formatting the plain text email message with the provided form data
  const plainTextMessage = `
    Form Submission Details:
    Company Name: ${companyName}
    Name: ${Name}
    Email ID: ${EmailID}
    Street: ${Street}
    City: ${City}
    State: ${State}
    Country: ${Country}
    Zip Code: ${ZipCode}
    Phone Number: ${phoneNumber}
    Message: ${message}
  `;

  const { to, subject } = req.body;

  try {
    // Sending email with the formatted message (both plain text and HTML)
    await sendEmail(to, subject, plainTextMessage, emailMessage);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
