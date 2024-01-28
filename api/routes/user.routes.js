import express from 'express';
import { updateUser, testapi } from '../controllers/user.controller.js';
import { VerifyUser } from '../utils/VerifyUser.js';

const router = express.Router();

router.get('/', testapi).put('/update/:userId', VerifyUser, updateUser);

export default router;
