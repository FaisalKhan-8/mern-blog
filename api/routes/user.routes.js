import express from 'express';
import {
  updateUser,
  testapi,
  SignOut,
  DeleteUser,
  getUsers,
  getUser,
} from '../controllers/user.controller.js';
import { VerifyUser } from '../utils/VerifyUser.js';

const router = express.Router();

router
  .get('/', testapi)
  .put('/update/:userId', VerifyUser, updateUser)
  .delete('/delete/:userId', VerifyUser, DeleteUser)
  .post('/signout', SignOut)
  .get('/getusers', VerifyUser, getUsers)
  .get('/:userId', getUser);

export default router;
