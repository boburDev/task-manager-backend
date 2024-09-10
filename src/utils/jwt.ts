import jwt from 'jsonwebtoken'
import { IUser } from '../models/user';

const secretKey: string = process.env.SECRET_KEY || 'there_is_bad_guy'

export function verify(token: string): IUser | null {
    try {
        const decoded: IUser = jwt.verify(token, secretKey) as IUser;
        return decoded;
    } catch (error) {
        console.error('Token verification error:', (error as Error).message);
        return null;
    }
}