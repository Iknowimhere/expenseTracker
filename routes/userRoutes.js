import express from 'express';
import {
  forgotPassword,
  getForgotPassword,
  getLoginUser,
  getRegisterUser,
  getResetPassword,
  loginUser,
  logout,
  registerUser,
  resetPassword,
} from '../controllers/authControllers.js';

let userRouter = express.Router();

userRouter.get('/register', getRegisterUser);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/login', getLoginUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.get('/forgot-password', getForgotPassword);
userRouter.get('/reset-password', getResetPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.get('/logout', logout);

export default userRouter;
