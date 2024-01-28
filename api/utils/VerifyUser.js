import jwt from 'jsonwebtoken';
import { ErrorHandle } from './ErrorHandle.js';

export const VerifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(ErrorHandle(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ErrorHandle(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
