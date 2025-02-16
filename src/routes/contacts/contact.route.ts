import  express from "express";
import { getContacts, addContact, deleteContact, editContact, detailContact } from "../../controllers/contactController";

const router = express.Router();

router.get('/', getContacts)
router.post('/', addContact)
router.get('/{id}', detailContact)
router.delete('/{id}/delete', deleteContact)
router.put('/{id}/update', editContact)

export default router