import { create, Whatsapp } from 'venom-bot';
import { sendToUser } from '../utils/websocket';

interface MessageResponse {
    status: string;
    message: string;
}

const clients = new Map<string, Whatsapp>();

const connectWhatsapp = async (userId: string): Promise<void> => {
    if (!clients.has(userId)) {
        console.log(`Connecting WhatsApp for user ${userId}...`);
        
        const client = await create(
            `session-${userId}`,
            (qrCode) => {
                sendToUser(userId, { type: 'qr', qrCode });
            },
            undefined,
            { headless: "new", disableWelcome: true, logQR: false }
        );

        clients.set(userId, client);
        sendToUser(userId, { type: 'connected', message: 'WhatsApp Connected' });
    } else {
        sendToUser(userId, { type: 'info', message: 'Already connected' });
    }
};

const disconnectWhatsapp = async (userId: string): Promise<void> => {
    if (clients.has(userId)) {
        const client = clients.get(userId);
        await client?.logout();
        clients.delete(userId);
        sendToUser(userId, { type: 'disconnected', message: 'WhatsApp Disconnected' });
    }
};

const sendMessage = async (userId: string, to: string, message: string): Promise<MessageResponse> => {
    try {
        const client = clients.get(userId);
        if (!client) throw new Error('WhatsApp is not connected. Please connect first.');

        await client.sendText(to, message);
        return { status: 'success', message: 'Message sent' };
    } catch (error) {
        return { status: 'error', message: (error as Error).message };
    }
};

export { connectWhatsapp, disconnectWhatsapp, sendMessage };
