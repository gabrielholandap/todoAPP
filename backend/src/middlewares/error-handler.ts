import { NextFunction, Request, Response } from "express"

import { ApiError } from "../errors"
import { ZodError } from "zod"

type ControllerMethod = 
  (req: Request, res: Response, next: NextFunction) => Promise<Response>

export function errorCatcher(controllerMethod: ControllerMethod) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await controllerMethod(req, res, next)
    } catch (error) {
      next(error)
      return
    }
  } 
}

export async function errorHandler(
  err: ApiError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: `${err.name}: ${err.message}`
    })
  }
  if (err instanceof ZodError) {
    return res.status(400).json(err)
  }

  res.status(500).json({
    error: "Internal server error"
  })

  // Let it crash
  throw err
}