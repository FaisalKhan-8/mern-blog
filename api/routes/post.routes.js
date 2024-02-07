import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import { createPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', VerifyUser, createPost);

export default router;
