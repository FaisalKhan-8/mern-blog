import express from 'express';
import { LoginHandler, signupHandler } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signupHandler).post('/login', LoginHandler);

export default router;
