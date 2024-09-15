const corsConfig = {
    origin: 'http://localhost:3001',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsConfig
