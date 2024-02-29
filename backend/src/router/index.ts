import { Router } from "express";

import { errorHandler } from "../middlewares/error-handler";

export const router = Router()

router.use(errorHandler)