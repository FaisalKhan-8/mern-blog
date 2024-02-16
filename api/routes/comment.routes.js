import express from 'express';
import { VerifyUser } from '../utils/VerifyUser.js';
import {
  createComment,
  getPostComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router
  .post('/create', VerifyUser, createComment)
  .get('/getPostComment/:postId', getPostComment);

export default router;
