import express from 'express';
import {
  updateUser,
  testapi,
  SignOut,
  DeleteUser,
} from '../controllers/user.controller.js';
import { VerifyUser } from '../utils/VerifyUser.js';

const router = express.Router();

router
  .get('/', testapi)
  .put('/update/:userId', VerifyUser, updateUser)
  .delete('/delete/:userId', VerifyUser, DeleteUser)
  .post('/signout', SignOut);

export default router;
