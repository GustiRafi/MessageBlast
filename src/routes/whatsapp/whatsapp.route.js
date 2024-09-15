const express = require("express");
const { getContactsWhatsapp, connectWhatsapp, disconnectWhatsapp, sendMessageWhatsapp, generatePdf } = require("../../controllers/whatsappController");

const router = express.Router();

router.post('/connect', connectWhatsapp)
router.post('/disconnect', disconnectWhatsapp)
router.post('/sendMessage', sendMessageWhatsapp)
router.get('/contacts', getContactsWhatsapp)
router.post('/generatePdf', generatePdf)

module.exports = router