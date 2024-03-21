import express from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  verifyOTPAndUpdatePassword,
} from '../controllers/authControllers.js';

let userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp-update-password', verifyOTPAndUpdatePassword);

export default userRouter;
