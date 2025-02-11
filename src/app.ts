import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import corsConfig from "./config/corsConfig"

dotenv.config()
const app = express()


app.use(express.json())
app.use(cors(corsConfig))

export default app