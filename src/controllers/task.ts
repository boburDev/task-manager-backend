import { Request, Response } from 'express'
import Task from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = req.user?.role === 'admin' ?
        await Task.find().populate('userId', 'username') :
        await Task.find({ userId: req.user?.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, userId: req.user?.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.user?._id },
            { title, description, completed },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user?._id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const analytics = await Task.aggregate([
            { $group: { _id: '$userId', totalTasks: { $count: {} }, completedTasks: { $sum: { $cond: ['$completed', 1, 0] } } } },
        ]);

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
};