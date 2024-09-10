import { Request, Response } from 'express'
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password, role='user', enter=false } = req.body;
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(201).json({ ...(enter && { token }), message: 'User registered successfully' });
    } catch (error: unknown) {
        res.status(500).json({ data: null, error: (error as Error).message })
    }
}

export const login = async (req:Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (error:unknown) {
        res.status(500).json({ data: null, error: (error as Error).message})
    }
}

export const forgetPassword = async (req: Request, res: Response) => {
    try {
        
    } catch (error: unknown) {
        res.status(400).json({ data: null, error: (error as Error).message })
    }
}

export const updateNewPassword = async (req: Request, res: Response) => {
    try {
        
    } catch (error: unknown) {
        res.status(400).json({ data: null, error: (error as Error).message })
    }
}