import { Router } from "express";

import { AuthControllerFactory } from "../factory/auth";

const controller = AuthControllerFactory.handle()

export const authRouter = Router()

authRouter.post("/sign-in", controller.signIn.bind(controller))
authRouter.post("/sign-up", controller.signUp.bind(controller))
authRouter.post("/rt", controller.refreshToken.bind(controller))