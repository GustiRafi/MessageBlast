import express from 'express';
import { getContactsWhatsapp, connectWhatsapp, disconnectWhatsapp, sendMessageWhatsapp } from '../../controllers/whatsappController';

const router = express.Router();

router.post('/connect', connectWhatsapp)
router.post('/disconnect', disconnectWhatsapp)
router.post('/sendMessage', sendMessageWhatsapp)
router.get('/contacts', getContactsWhatsapp)

export default router