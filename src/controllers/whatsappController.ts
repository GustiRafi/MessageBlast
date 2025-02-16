import { Request, Response } from 'express';
import { connectWhatsapp, disconnectWhatsapp, sendMessage } from '../services/whatsappService';

const connect = async (req: Request, res: Response): Promise<any> => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    await connectWhatsapp(userId);
    return res.json({ status: 'success', message: 'Connecting to WhatsApp' });
};

const disconnect = async (req: Request, res: Response): Promise<any> => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    await disconnectWhatsapp(userId);
    return res.json({ status: 'success', message: 'WhatsApp disconnected' });
};

const send = async (req: Request, res: Response): Promise<any> => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ status: 'error', message: 'User not authenticated' });

    const { to, message } = req.body;
    const response = await sendMessage(userId, to, message);
    return res.json(response);
};

export { connect, disconnect, send };
