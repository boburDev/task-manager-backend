import express from'express'
import { signup, login } from '../controllers/auth';

const router = express.Router();

router
    .post('/register', signup)
    .post('/login', login)

export default router