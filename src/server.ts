import dotenv from 'dotenv'
import app from './app'
import consola from 'consola'
import router from './routes'
import http from 'http'
import session from 'express-session'
import { initWebSocket } from './utils/websocket'


const port = process.env.PORT;
const server = http.createServer(app)
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
)

app.use('/api/v1', router)

initWebSocket(server)

app.listen(port, () => {
    consola.ready({
        message: `Server listening on http://localhost:${port}`,
        badge: true
    })
})