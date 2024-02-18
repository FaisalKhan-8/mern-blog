import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import {
  createComment,
  getPostComment,
  likeComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router
  .post('/create', VerifyUser, createComment)
  .get('/getPostComment/:postId', getPostComment)
  .put('/likeComment/:commentId', VerifyUser, likeComment);

export default router;
