import { Request, Response } from 'express';
import prisma from '../config/db';

export const getContacts = async (req: Request, res: Response): Promise<any> => {
    try {
        const contacts = await prisma.user.findMany({ include: { contacts: true } }); 
        res.status(200).json(contacts);
    } catch (error: any) {
        console.log('Error:', error)
        res.status(500).json({
            code: 500,
            status: 'failed get contacts',
            error: error.message
        });
    }
}

export const addContact = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, nama, phone } = req.body;
        const contact = await prisma.contact.create({
            data: {
                userId,
                "name": nama,
                "phone": phone
            }
        });
        res.status(201).json(contact);
    } catch (error: any) {
        console.log('Error:', error)
        res.status(500).json({
            code: 500,
            status: 'failed add contact',
            error: error.message
        });
    }
}

export const deleteContact = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, contactId } = req.body;
        const contact = await prisma.contact.deleteMany({
            where: {
                userId: userId,
                id: contactId
            }
        });
        res.status(200).json(contact);
    } catch (error: any) {
        console.log('Error:', error)
        res.status(500).json({
            code: 500,
            status: 'failed delete contact',
            error: error.message
        });
    }
}

export const editContact = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, contactId, name, phone } = req.body;
        const contact = await prisma.contact.updateMany({
            where: {
                userId: userId,
                id: contactId
            },
            data: {
                name: name,
                phone: phone
            }
        });
        res.status(200).json(contact);
    } catch (error: any) {
        console.log('Error:', error)
        res.status(500).json({
            code: 500,
            status: 'failed edit contact',
            error: error.message
        });
    }
}

export const detailContact = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, contactId } = req.body;
        const contact = await prisma.contact.findMany({
            where: {
                userId: userId,
                id: contactId
            }
        });
        res.status(200).json(contact);
    } catch (error: any) {
        console.log('Error:', error)
        res.status(500).json({
            code: 500,
            status: 'failed detail contact',
            error: error.message
        });
    }
}
