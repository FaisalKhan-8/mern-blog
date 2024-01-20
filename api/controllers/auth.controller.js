import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { ErrorHandle } from '../utils/ErrorHandle.js';

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
export const LoginHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    next(ErrorHandle(400, 'Email or password required'));
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      next(ErrorHandle(401, 'user not found'));
    }
    if (user) {
      //comparing password...
      if (bcryptjs.compareSync(password, user.password)) {
        res.status(200);
        res.json({ message: 'Login successful' });
      } else {
        next(ErrorHandle(401, 'Invalid password'));
      }
    }
  } catch (error) {
    next(error);
  }
};
