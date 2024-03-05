import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from '../errors'
import { Database } from '../../modules/user/repositories/prisma/database'
import { AuthUseCases } from '../../modules/auth/use-cases/auth'

const { database } = new Database()

type AuthGuardDescriptorParams = [
  req: Request, 
  res: Response, 
  next: NextFunction
]

type descriptorMethod = (...args: AuthGuardDescriptorParams) => Promise<Response>

type OptionalAuthenticatedParams = {
  /**
   * Default value `false`
   */
  optional?: boolean
}

export function AuthGuard(params?: OptionalAuthenticatedParams) {
  return function(
    target: Object,
    key: Object | Symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: descriptorMethod = descriptor.value

    descriptor.value = async function (...[req, res, next]: AuthGuardDescriptorParams) {
      try {
        const authHeader = req.headers.Authorization
  
        const isOptional = params && !!params.optional
        // const isOptional = params && typeof params.optional !== 'undefined' && params.optional

        if (!isOptional && !authHeader || authHeader?.constructor !== String) {
          throw new UnauthorizedError({ message: "Token not provided" })
        }
  
        if (isOptional && !authHeader) {
          return await originalMethod.apply(this, [req, res, next])
        }

        const parts = authHeader.split(" ")
  
        if (parts.length !== 2) {
          throw new UnauthorizedError({ message: "Invalid token" })
        }
  
        const [scheme, token] = parts
  
        if (!/^Bearer$/i.test(scheme)) {
          throw new UnauthorizedError({ message: "Invalid token" })
        }
  
        const tokenData = AuthUseCases.verifyJwtAccessToken(token)
        
        if (!tokenData || !tokenData?.sub) {
          throw new UnauthorizedError({ message: "Invalid token" })
        }
  
        const user = await database.user.findFirst({
          where: {
            id: tokenData.sub
          },
          select: {
            id: true
          }
        })
  
        if (!user) {
          throw new UnauthorizedError({ message: "Invalid token" })
        }
  
        const reqUserData = { 
          userData: {
            id: tokenData.sub 
          } 
        }
  
        Object.assign(req, reqUserData)
  
        return await originalMethod.apply(this, [req, res, next])
      } catch (error) {
        next(error)
        return
      }
    }
  }
}