import { create, } from 'venom-bot';
import { Request, Response } from 'express';
let client: any;


const connectWhatsapp = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!client) {
            client = await create("whatsapp-bot", (base64Qrimg) => {
                if (!res.headersSent) {
                    return res.json({
                        code: 200,
                        status: 'success get qrcode',
                        qrcode: base64Qrimg
                    });
                }
            });

            // Jika client berhasil dibuat, kirim response sukses
            if (!res.headersSent) {
                return res.json({
                    code: 200,
                    status: 'success connect',
                    client
                });
            }
        } else {
            // Jika client sudah ada, kirim response 'already connect'
            if (!res.headersSent) {
                return res.json({
                    code: 200,
                    status: 'already connect',
                    client
                });
            }
        }
    } catch (error) {
        if (!res.headersSent) {
            return res.json({
                code: 400,
                status: 'failed connect',
                error
            });
        }
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