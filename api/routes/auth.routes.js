import express from 'express';
import {
  signInHandler,
  signupHandler,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupHandler).post('/signin', signInHandler);

export default router;
