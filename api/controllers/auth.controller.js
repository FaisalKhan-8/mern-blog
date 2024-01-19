import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signupHandler = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return res.status(400).json({
      message: 'Please provide all fields',
    });
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
    res.status(500);
    res.json({
      message: error.message,
    });
  }
};
