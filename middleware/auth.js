import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isLogged = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.json({
        message: 'please login',
      });
    }
    const decodedToken = await jwt.verify(token, 'secret');
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.json({
        message: 'user doesnt exist',
      });
    }
    req.userId = user?._id;
    next();
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
