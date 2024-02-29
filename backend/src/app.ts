import express from "express"
import cors from "cors"

import { CONFIG } from "./config"
import { router } from "./router"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.listen(CONFIG.port, () => {
  console.log(`HTTP server is running on port: ${CONFIG.port}`)
})