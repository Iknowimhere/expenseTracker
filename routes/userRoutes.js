import express from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from '../controllers/authControllers.js';

let userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
