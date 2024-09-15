import { Request, Response } from 'express'
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.SECRET_KEY || 'there_is_bad_guy'

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password, role='user', enter=false } = req.body;
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, secretKey!, { expiresIn: '1h' });
        const userPayload = { username: newUser.username, role: newUser.role }
        res.status(201).json({ ...(enter && { token }), user: userPayload, message: 'User registered successfully' });
    } catch (error: unknown) {
        console.log(error);
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

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey!, { expiresIn: '1h' });
        const userPayload = { username: user.username, role: user.role }

        res.json({ token, user: userPayload });
    } catch (error:unknown) {
        res.status(500).json({ data: null, error: (error as Error).message })
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