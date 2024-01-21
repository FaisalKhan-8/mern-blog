import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { ErrorHandle } from '../utils/ErrorHandle.js';
import jwt from 'jsonwebtoken';

// Signup handler...
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
  // hasing password here...
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

// Login handler...
export const signInHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    next(ErrorHandle(400, 'Email or password required'));
  }
  try {
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return next(ErrorHandle(404, 'user not found'));
    }
    //comparing password...
    const ValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!ValidPassword) {
      return next(ErrorHandle(400, 'Invalid credentials'));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // sending the rest of the user but not the password...
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
