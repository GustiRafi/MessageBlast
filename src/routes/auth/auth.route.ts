import express from 'express';
import { register, logout, login } from '../../controllers/authController';
import { authenticateUser } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticateUser, logout)

export default router