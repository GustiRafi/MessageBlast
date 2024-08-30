const express = require('express')
const router = express.Router()

const waRouter = require('./whatsapp/whatsapp.route') 

router.use('/whatsapp', waRouter)

// router.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World!'
//     })
// })

module.exports = router