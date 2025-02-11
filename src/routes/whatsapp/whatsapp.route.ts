import express from 'express';
import { getContactsWhatsapp, connectWhatsapp, disconnectWhatsapp, sendMessageWhatsapp, generatePdf } from '../../controllers/whatsappController';

const router = express.Router();

router.post('/connect', connectWhatsapp)
router.post('/disconnect', disconnectWhatsapp)
router.post('/sendMessage', sendMessageWhatsapp)
router.get('/contacts', getContactsWhatsapp)
router.post('/generatePdf', generatePdf)

export default router