const express = require("express");
const { getContactsWhatsapp, connectWhatsapp, disconnectWhatsapp, sendMessageWhatsapp } = require("../../controllers/whatsappController");

const router = express.Router();

router.post('/connect', connectWhatsapp)
router.post('/disconnect', disconnectWhatsapp)
router.post('/sendMessage', sendMessageWhatsapp)
router.get('/contacts', getContactsWhatsapp)

module.exports = router