import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { ErrorHandle } from '../utils/ErrorHandle.js';

export const signupHandler = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(ErrorHandle(400, 'All fields are required'));
  }

  // hasing password here

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201);
    res.json({ message: 'Signup successful' });
  } catch (error) {
    next(error);
  }
};
