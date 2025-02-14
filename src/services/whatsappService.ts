import { create, Whatsapp } from 'venom-bot';

interface MessageResponse {
    status: string;
    message: string;
}

let client: Whatsapp | null = null;
let qr: string = '';

const connectWhatsapp = async (): Promise<{ client: Whatsapp | null; qr: string }> => {
    if (!client) {
        console.log('Connecting to WhatsApp...');
        return new Promise((resolve, reject) => {
            create(
                'sender-session',
                (base64Qrimg) => {
                    qr = base64Qrimg;
                },
                undefined,
                {
                    headless: "new",
                    disableWelcome: true,
                    logQR: false,
                }
            )
            .then((whatsappClient) => {
                client = whatsappClient;
                console.log('WhatsApp Connected!');
                resolve({ client, qr });
            })
            .catch((error) => {
                console.error('Error connecting WhatsApp:', error);
                reject({ client: null, qr: '', error: error.message });
            });
        });
    } else {
        return { client, qr: '' };
    }
};

const disconnectWhatsapp = async (): Promise<void> => {
    if (client) {
        console.log('Disconnecting WhatsApp...');
        await client.logout();
        client = null;
        console.log('WhatsApp Disconnected!');
    } else {
        console.log('No active WhatsApp session.');
    }
};

const sendMessage = async (to: string, message: string): Promise<MessageResponse> => {
    try {
        if (!client) {
            return {
                status: 'error',
                message: 'WhatsApp is not connected. Please connect first.'
            };
        }

        await client.sendText(to, message);

        return {
            status: 'success',
            message: 'Message sent'
        };
    } catch (error) {
        console.error('Error sending message:', error);
        return {
            status: 'error',
            message: (error as Error).message
        };
    }
};

export { connectWhatsapp, disconnectWhatsapp, sendMessage };
