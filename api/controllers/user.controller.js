import User from '../models/user.model.js';
import { ErrorHandle } from '../utils/ErrorHandle.js';
import bcryptjs from 'bcryptjs';

export const testapi = (req, res) => {
  res.json({ message: 'api testing' });
};

export const UpdateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(ErrorHandle(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(ErrorHandle(400, 'Password must be at least 8 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        ErrorHandle(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(ErrorHandle(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(ErrorHandle(400, 'Username must be lowercase'));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        ErrorHandle(400, 'Username must contain only letters and numbers')
      );
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};
