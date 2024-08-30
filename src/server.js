require('dotenv').config()
const app = require('./app')
const consola = require('consola')
const router = require('./routes')

const port = process.env.PORT;

app.use('/api/v1', router)

app.listen(port, () => {
    consola.ready({
        message: `Server listening on http://localhost:${port}`,
        badge: true
    })
})