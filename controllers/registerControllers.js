import User from '../models/User.js';

export const registerUser = async (req, res, next) => {
  try {
    const { phoneNumber, email, password, confirmPassword } = req.body;
    const newUser = await User.create({
      phoneNumber,
      email,
      password,
      confirmPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.json({ error: error.message });
  }
};
