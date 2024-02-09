import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import { createPost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', VerifyUser, createPost).get('/getposts', getPosts);

export default router;
