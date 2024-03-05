import { Router } from "express";

import { TodoControllerFactory } from "../factory/todo";

const controller = TodoControllerFactory.handle()

export const todoRouter = Router()

todoRouter.get("/", controller.getMany.bind(controller))
todoRouter.post("/", controller.create.bind(controller))
todoRouter.patch("/:id", controller.update.bind(controller))
todoRouter.delete("/:id", controller.delete.bind(controller))