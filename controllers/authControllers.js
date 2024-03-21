import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const registerUser = async (req, res, next) => {
  try {
    const { phoneNumber, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: 'user exists already,please login',
      });
    }
    const newUser = await User.create({
      phoneNumber,
      email,
      password,
      confirmPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (
      !existingUser ||
      !(await existingUser.comparePassword(password, existingUser.password))
    ) {
      return res.json({
        message: 'user and password doesnt match',
      });
    }

    const token = await jwt.sign({ id: existingUser._id }, 'secret', {
      expiresIn: 24 * 60 * 60,
    });
    res.json({
      user: existingUser,
      token,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'allen.turner19@ethereal.email',
        pass: 'TrCmyjmNvuqcYgMXfa',
      },
    });
    let options={
      from: 'allen.turner19@ethereal.email',
      to:'umashankarp33@gmail.com',
      subject:"Forgot password link",
      // text:`This is the link for forgot password ${http://localhost:5000/api/v1/expenseTracker/verify-otp-update-password} this expires in 1 hour`,
    }
    await transporter.sendMail();
    
    // Send email with reset link containing token
    // Code for sending email goes here
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyOTPAndUpdatePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
