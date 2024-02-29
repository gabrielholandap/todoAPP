import { Router } from "express";

import { errorHandler } from "../shared/middlewares/error-handler";
import { authRouter } from "./auth";

export const router = Router()

router.use(authRouter)

router.use(errorHandler)