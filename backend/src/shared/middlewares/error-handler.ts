import { NextFunction, Request, Response } from "express"

import { ApiError, ValidationError } from "../errors"
import { ZodError } from "zod"

type exceptionsWrapperDescriptorParams = [
  req: Request, 
  res:Response, 
  next: NextFunction
]

type descriptorMethod = (...args: exceptionsWrapperDescriptorParams) => Promise<Response>

export function ExceptionsCatcher(): (...args: any) => PropertyDescriptor {
  return function (
      target: Object,
      key: string | symbol,
      descriptor: PropertyDescriptor
  ) {
    const originalMethod: descriptorMethod = descriptor.value 

    descriptor.value = async function (...[req, res, next]: exceptionsWrapperDescriptorParams) {
      try {
        return await originalMethod.apply(this, [req, res, next])
      } catch (err) {
        next(err)
        return
      }
    }
    return descriptor
  }
}

export async function errorHandler(
  err: ApiError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)

  if (err instanceof ValidationError) {
    return res.status(err.httpStatusCode).json({
      error: `${err.name}: ${err.message}`,
      errors: err.errors
    })
  }
  if (err instanceof ApiError) {
    return res.status(err.httpStatusCode).json({
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