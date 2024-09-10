import { Request, Response } from 'express'

export const login = async (req:Request, res: Response) => {
    try {
        
    } catch (error:unknown) {
        res.status(400).json({ data: null, error: (error as Error).message})
    }
}

export const loginBySubdomain = async (req: Request, res: Response) => {
    try {
        
    } catch (error: unknown) {
        res.status(400).json({ data: null, error: (error as Error).message })
    }
}

export const verifyPhoneBeforeCreateAccaunt = async (req: Request, res: Response) => {
    try {
        
    } catch (error: unknown) {
        res.status(400).json({ data: null, error: (error as Error).message })
    }
}

export const signup = async (req:Request, res: Response) => {
    try {
        
    } catch (error: unknown) {
        res.status(400).json({ data: null, error: (error as Error).message})
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