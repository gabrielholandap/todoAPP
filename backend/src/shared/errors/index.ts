import { ValidationError as ClassValidatorError } from 'class-validator'

type ApiErrorConstructor = {
  message?: string
  httpStatusCode?: number
}
type DerivatedErrorConstructor = {
  message?: string
}

type ValidationErrorConstructorParams = {
  errors: ClassValidatorError[]
} & DerivatedErrorConstructor

export class ApiError extends Error {
  name: string = "ApiError"
  message: string = "Something wrong ocurred"
  httpStatusCode: number = 400

  constructor(params?: ApiErrorConstructor) {
    super()

    if (params?.message) {
      this.message = params.message
    }
    if (params?.httpStatusCode) {
      this.httpStatusCode = params.httpStatusCode
    }
  }
}

export class BadRequestError extends ApiError {
  name: string = "BadRequestError"

  constructor(params?: DerivatedErrorConstructor) {
    super({
      message: params?.message || "Bad request"
    })
  }
}

export class NotFoundError extends ApiError {
  name: string = "NotFoundError"
  httpStatusCode: number = 404

  constructor(params?: DerivatedErrorConstructor) {
    super({
      message: params?.message || "Data not found"
    })
  }
}

export class UnauthorizedError extends ApiError {
  name: string = "UnauthorizedError"
  httpStatusCode: number = 401

  constructor(params?: DerivatedErrorConstructor) {
    super({
      message: params?.message || "Unauthorized action"
    })
  }
}

export class ValidationError extends ApiError {
  name: string = 'ValidationError'
  message: string = 'Data not satisfied validation'
  httpStatusCode: number = 400
  errors: ClassValidatorError[] = []

  constructor(params: ValidationErrorConstructorParams) {
    super(params)

    this.errors = params.errors
  }
}