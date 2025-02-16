import express, { Router } from 'express'
import waRouter from './whatsapp/whatsapp.route'
import authRouter from './auth/auth.route'
import contactRouter from './contacts/contact.route'

const router: Router = express.Router()
router.use('/whatsapp', waRouter)
router.use('/auth', authRouter)
router.use('/contacts', contactRouter)

export default router