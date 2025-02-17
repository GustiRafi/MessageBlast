import  express from "express";
import { getContacts, addContact, deleteContact, editContact, detailContact } from "../../controllers/contactController";
import { authenticateUser } from "../../middlewares/authMiddleware";

const router = express.Router();

router.get('/', authenticateUser, getContacts)
router.post('/', authenticateUser, addContact)
router.get('/{id}', authenticateUser, detailContact)
router.delete('/{id}/delete', authenticateUser, deleteContact)
router.put('/{id}/update', authenticateUser, editContact)

export default router