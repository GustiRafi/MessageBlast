import express from 'express';
import { connect, disconnect, send } from '../../controllers/whatsappController';

const router = express.Router();

router.post('/connect', connect)
router.post('/disconnect', disconnect)
router.post('/sendMessage', send)
// router.get('/contacts', getContactsWhatsapp)

export default router