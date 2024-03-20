import express from 'express';
import { registerUser } from '../controllers/registerControllers.js';

let userRouter = express.Router();

userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);

export default userRouter;
