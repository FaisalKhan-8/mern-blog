import express from 'express';
import { UpdateUser, testapi } from '../controllers/user.controller.js';
import { VerifyUser } from '../utils/VerifyUser.js';

const router = express.Router();

router.get('/', testapi).put('/update/:userId', VerifyUser, UpdateUser);

export default router;
