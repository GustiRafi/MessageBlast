// const ws = require('ws')
const venom = require('venom-bot')
let client;

const connectWhatsapp = async (req, res) => {
    try {
        if (!client) {
            client = await venom.create({
                session: "sender",
                multidevice: true,
                headless: true,
                catchQR: (base64Qrimg) => {
                    // Pastikan hanya mengirim response QR code jika belum ada yang dikirim
                    if (!res.headersSent) {
                        return res.json({
                            code: 200,
                            status: 'success get qrcode',
                            qrcode: base64Qrimg
                        });
                    }
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



const disconnectWhatsapp = async (req, res) => {
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

const generatePdf = async (req,res) => {
    if(client){
        try {
            
        } catch (error) {
            
        }
    }
}

const sendMessageWhatsapp = async (req, res) => {
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

const getContactsWhatsapp = async (req, res) => {
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

module.exports = {
    connectWhatsapp,
    disconnectWhatsapp,
    sendMessageWhatsapp,
    getContactsWhatsapp
}