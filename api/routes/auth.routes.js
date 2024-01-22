import express from 'express';
import {
  googleAuthHandler,
  signInHandler,
  signupHandler,
} from '../controllers/auth.controller.js';

const router = express.Router();

router
  .post('/signup', signupHandler)
  .post('/signin', signInHandler)
  .post('/google', googleAuthHandler);

export default router;
