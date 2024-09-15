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
            { _id: id, userId: req.user?.id },
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
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user?.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const getUserTaskAnalytics = async (req: Request, res: Response) => {
    try {
        const analytics = await Task.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalTasks: { $sum: 1 },
                    completedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $project: {
                    userId: '$_id',
                    email: '$userDetails.email',
                    totalTasks: 1,
                    completedTasks: 1,
                    completionRate: {
                        $cond: [{ $eq: ['$totalTasks', 0] }, 0, { $divide: ['$completedTasks', '$totalTasks'] }],
                    },
                },
            },
        ]);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const analytics = await Task.aggregate([
            {
                $group: {
                    _id: null,
                    totalTasks: { $sum: 1 },
                    totalCompletedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
                    totalNotCompletedTasks: { $sum: { $cond: ['$completed', 0, 1] } },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalTasks: 1,
                    totalCompletedTasks: 1,
                    totalNotCompletedTasks: 1,
                },
            },
        ]);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
};