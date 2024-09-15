// const ws = require('ws')
const venom = require('venom-bot')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
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

const generatePdf = async (req, res) => {
    if (client) {
        try {
            const { message = "Hello, World!" } = req.body;

            // Buat dokumen PDF
            const doc = new PDFDocument();

            // Path untuk menyimpan file PDF
            const filePath = path.join(__dirname, 'example.pdf');
            
            // Pipe output ke file
            const writeStream = fs.createWriteStream(filePath);
            doc.pipe(writeStream);

            // Tambahkan teks ke PDF
            doc.text(message);

            // Selesaikan pembuatan PDF
            doc.end();

            // Tunggu sampai file selesai ditulis
            writeStream.on('finish', () => {
                res.json({
                    code: 200,
                    status: 'success generate pdf',
                    doc: `http://localhost:5000/${path.basename(filePath)}`
                });
            });

            // Error handling saat penulisan file
            writeStream.on('error', (err) => {
                res.json({
                    code: 400,
                    status: 'failed generate pdf',
                    error: err.message
                });
            });

        } catch (error) {
            // Jika ada error pada blok try
            res.json({
                code: 400,
                status: 'failed generate pdf',
                error
            });
        }
    } else {
        // Jika client tidak terhubung
        res.json({
            code: 400,
            status: 'client not connected'
        });
    }
};


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
    getContactsWhatsapp,
    generatePdf
}