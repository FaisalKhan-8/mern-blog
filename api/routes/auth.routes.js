import express from 'express';
import { signupHandler } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupHandler);

export default router;
