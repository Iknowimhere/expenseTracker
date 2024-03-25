import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'princess.ryan@ethereal.email',
    pass: 'zVUmgS6Tymh5hhuK6v',
  },
});

export const sendMail = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'princess.ryan@ethereal.email', // Your email address
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
