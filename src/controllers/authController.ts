import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import prisma from '../config/db';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });


        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (error: any) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}


export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
        });

        return res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
