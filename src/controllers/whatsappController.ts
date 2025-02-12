import { create, } from 'venom-bot';
import { Request, Response } from 'express';
let client: any;
let qr = '';


const connectWhatsapp = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!client) {
            client = await create(
                'sender-session',
                (base64Qrimg) => {
                    qr = base64Qrimg;
                    return  res.json({
                        code: 200,
                        status: 'SUCCESS get qr',
                        qr
                   });
                },
                undefined,
                {
                    headless: "new",
                    disableWelcome: true,
                    logQR: false,
                }
            );
        } else {
            if (!res.headersSent) {
                return res.json({
                    code: 200,
                    status: 'already connect',
                    client
                });
            }
        }
    } catch (error: any) {
        console.log('Error:', error)
        return res.json({
            code: 400,
            status: 'failed connect',
            error: error.message
        });
    }
};

const disconnectWhatsapp = async (req: Request, res: Response): Promise<any>  => {
    if (client) {
        await client.destroy()
        res.json({
            code: 200,
            status: 'success disconnect'
        })
    } else {
        res.json({
            code: 400,
            status: 'failed disconnect'
        })
    }
}

const sendMessageWhatsapp = async (req: Request, res: Response): Promise<any>  => {
    if(client){
        try {
            await client.sendText(req.body.to, req.body.message)
            res.json({
                code: 200,
                status: 'success send message'
            })
        } catch (error) {
            res.json({
                code: 400,
                status: 'failed send message',
                error
            })
        }
    }else{
        res.json({
            code: 400,
            status: 'failed connect'
        })
    }
}

const getContactsWhatsapp = async (req: Request, res: Response): Promise<any>  => {
    if(client){
        try {
            const contacts = await client.getAllContacts()
            res.json({
                code: 200,
                status: 'success get contacts',
                contacts
            })
        } catch (error) {
            res.json({
                code: 400,
                status: 'failed get contacts',
                error
            })
        }
    }else{
        res.json({
            code: 400,
            status: 'failed connect'
        })
    }
}

export {
    connectWhatsapp,
    disconnectWhatsapp,
    sendMessageWhatsapp,
    getContactsWhatsapp
}