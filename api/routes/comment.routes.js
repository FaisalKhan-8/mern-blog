import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import { createComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', VerifyUser, createComment);

export default router;
