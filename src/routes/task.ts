import express from 'express'
import * as Task from '../controllers/task';
import { validateJWT, validateAdmin } from '../middlewares/validation';

const router = express.Router();

router
    .get('/all', validateJWT, Task.getTasks)
    .post('/create', validateJWT, Task.createTask)
    .put('/update/:id', validateJWT, Task.updateTask)
    .delete('/delete/:id', validateJWT, Task.deleteTask)
    .get('/dashboard', validateJWT, validateAdmin, Task.getAnalytics);

export default router