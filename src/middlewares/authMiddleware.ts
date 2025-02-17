import { promises } from 'dns';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const SECRET_KEY = process.env.JWT_SECRET || '';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as unknown as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Invalid token' });
        return;
    }
};
