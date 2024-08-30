const express = require('express')
const cors = require('cors')
// const webSocket = require('ws')
const corsConfig = require('./config/corsConfig')

const app = express()
// const wss = new webSocket.Server({ port: 8080 })

app.use(express.json())
app.use(cors(corsConfig))

module.exports = app