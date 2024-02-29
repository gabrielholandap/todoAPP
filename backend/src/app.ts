import express from "express"
import cors from "cors"

import { ENV_VARS } from "./shared/env-vars"
import { router } from "./router"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.listen(ENV_VARS.port, () => {
  console.log(`HTTP server is running on port: ${ENV_VARS.port}`)
})