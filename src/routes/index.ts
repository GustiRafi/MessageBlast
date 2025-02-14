import express, { Router } from 'express'
import waRouter from './whatsapp/whatsapp.route'
import authRouter from './auth/auth.route'

const router: Router = express.Router()
router.use('/whatsapp', waRouter)
router.use('/auth', authRouter)

export default router