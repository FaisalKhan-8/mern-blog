import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router
  .post('/create', VerifyUser, createPost)
  .get('/getposts', getPosts)
  .delete('/deletepost/:postId/:userId', VerifyUser, deletePost)
  .put('/updatepost/:postId/:userId', VerifyUser, updatePost);

export default router;
