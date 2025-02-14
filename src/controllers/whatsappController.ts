import { create,Whatsapp } from 'venom-bot';
import { Request, Response } from 'express'; 
import { stat } from 'fs';


let client: Whatsapp | null = null;
let qr: string = '';

const connect = async (req: Request, res: Response): Promise<any> => {
    try {
       client = await create(
            'sender-session',
            (base64Qrimg) => {
                qr = base64Qrimg;
                res.status(200).json({
                    code: 200,
                    status: 'QR Code ready',
                    qr: qr
                });
            },
            undefined,
            {
                headless: "new",
                disableWelcome: true,
                logQR: false,
            }
        )
        res.status(200).json({
            code: 200,
            status: 'Connected to WhatsApp',
        });
    } catch (error: any) {
        console.log('Error:', error)
        res.status(500).json({
            code: 500,
            status: 'failed connect',
            error: error.message
        });
    }
};

const disconnect = async (req: Request, res: Response): Promise<any>  => {
    try {
        await client?.logout();

        res.status(200).json({
            code: 200,
            status: 'Disconnected from WhatsApp',
        });
    } catch (error: any) {
        console.log('Error:', error)
        res.json({
            code: 400,
            status: 'failed disconnect',
            error: error.message
        });
    }
}

const sendMessageWhatsapp = async (req: Request, res: Response): Promise<any>  => {
    const { to, message } = req.body;
    try {
        if (!client) {
            res.status(400).json({
                code: 400,
                status: 'error',
                message: 'WhatsApp is not connected. Please connect first.'
            });
        }
        await client?.sendText(to, message);
        res.json({
            code: 200,
            status: 'message sent',
            message: message
        });
    } catch (error: any) {
        console.log('Error:', error)
        res.json({
            code: 400,
            status: 'failed send message',
            error: error.message
        });
    }
}

export {
    connect,
    disconnect,
    sendMessageWhatsapp,
}