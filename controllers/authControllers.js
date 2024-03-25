import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from '../utils/sendEmail.js';

export const getRegisterUser = (req, res, next) => {
  res.render('Register');
};
export const getLoginUser = (req, res, next) => {
  res.render('Login');
};

export const getForgotPassword = (req, res, next) => {
  res.render('ForgotPassword');
};

export const getResetPassword = (req, res, next) => {
  res.render('ResetPassword');
};
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
    const token = await jwt.sign({ id: newUser._id }, 'secret', {
      expiresIn: 24 * 60 * 60,
    });
    res.cookie('jwt', token);
    res.redirect('/api/v1/expenseTracker/expenses');
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
    res.cookie('jwt', token);
    res.redirect('/api/v1/expenseTracker/expenses');
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
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = Date.now() + 5*60*1000;
    await user.save({ validateModifiedOnly: true });

    const resetLink = `http://localhost:5000/api/v1/expenseTracker/reset-password`; // Change this URL
    const emailText = `Use the following link to reset your password. OTP: ${otp}: ${resetLink}`;
    await sendMail(user.email, 'Password Reset', emailText);
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token/OTP' });
    }

    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();
    const tokenjwt = await jwt.sign({ id: user._id }, 'secret', {
      expiresIn: 24 * 60 * 60,
    });
    res.cookie('jwt', tokenjwt);
    res.redirect('/api/v1/expenseTracker/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.redirect('/api/v1/expenseTracker/login');
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
