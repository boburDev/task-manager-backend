import express from'express'
import * as Auth from '../controllers/auth';

const router = express.Router();

router
    .post('/register', Auth.signup)
    .post('/login', Auth.login)

export default router