import dotenv from 'dotenv'
import app from './app'
import consola from 'consola'
import router from './routes'


const port = process.env.PORT;

app.use('/api/v1', router)

app.listen(port, () => {
    consola.ready({
        message: `Server listening on http://localhost:${port}`,
        badge: true
    })
})