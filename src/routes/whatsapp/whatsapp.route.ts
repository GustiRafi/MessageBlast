import express from 'express';
import { connect, disconnect, send } from '../../controllers/whatsappController';
import { authenticateUser } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/connect',authenticateUser, connect)
router.post('/disconnect', authenticateUser, disconnect)
router.post('/sendMessage', authenticateUser, send)
// router.get('/contacts', getContactsWhatsapp)

export default router