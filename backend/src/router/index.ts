import { Router } from "express";

import { errorHandler } from "../shared/middlewares/error-handler";

export const router = Router()

router.use(errorHandler)