import express, { Router } from 'express'
import waRouter from './whatsapp/whatsapp.route'

const router: Router = express.Router()
router.use('/whatsapp', waRouter)

export default router