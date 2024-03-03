import { Router } from "express";

import { errorHandler } from "../shared/middlewares/error-handler";
import { authRouter } from "./auth";

export const router = Router()

router.use("/auth", authRouter)

router.get("/health", (req, res) => {
  res.status(200).json({
    datetime: new Date().toISOString()
  })
})

router.use(errorHandler)