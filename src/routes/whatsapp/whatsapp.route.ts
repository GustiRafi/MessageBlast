import express from 'express';
import { connect, disconnect, sendMessageWhatsapp } from '../../controllers/whatsappController';

const router = express.Router();

router.post('/connect', connect)
router.post('/disconnect', disconnect)
router.post('/sendMessage', sendMessageWhatsapp)
// router.get('/contacts', getContactsWhatsapp)

export default router