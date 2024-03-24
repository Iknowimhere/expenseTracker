import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'chandler.boyer@ethereal.email',
    pass: 'w3JjmxvEvtVQJjBekd',
  },
});

export const sendMail = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'chandler.boyer@ethereal.email', // Your email address
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
