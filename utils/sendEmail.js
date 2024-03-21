import nodemailer from 'nodemailer';
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'allen.turner19@ethereal.email',
        pass: 'TrCmyjmNvuqcYgMXfa',
      },
    });

export const sendMail = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Your email address
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};