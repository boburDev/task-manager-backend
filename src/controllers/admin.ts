import { Request, Response } from 'express'

export const login = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(400).json({ data: null, error: (error as Error).message })
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        
        res.json({ data: {}, error: null })
    } catch (error) {
        res.status(400).json({ data: null, error: (error as Error).message })
    }
}

