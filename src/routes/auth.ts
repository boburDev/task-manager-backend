import express from'express'
import * as Auth from '../controllers/auth';
import { loginAttemptLimiter } from '../middlewares/attemptLimiter';

const router = express.Router();

router
    .post('/register', Auth.signup)
    .post('/login', loginAttemptLimiter, Auth.login)

export default router