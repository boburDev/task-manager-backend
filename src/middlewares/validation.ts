import { NextFunction, Request, Response } from 'express'
import { verify } from '../utils/jwt';
import User, { IUser } from '../models/user';

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
    }
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
    try {
        let decoded: IUser | null = verify(String(token));
        if (!decoded) throw new Error("Invalid token!");

        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found!');

        req.user = decoded
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token not verified!', error: true });
    }
};

export const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Admins Only' });
    }
    next();
};