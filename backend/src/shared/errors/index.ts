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
  message: string = "Bad request"

  constructor(params?: DerivatedErrorConstructor) {
    super(params)
  }
}

export class NotFoundError extends ApiError {
  name: string = "NotFoundError"
  message: string = "Data not found"
  httpStatusCode: number = 404

  constructor(params?: DerivatedErrorConstructor) {
    super(params)
  }
}

export class UnauthorizedError extends ApiError {
  name: string = "UnauthorizedError"
  message: string = "Unauthorized action"
  httpStatusCode: number = 401

  constructor(params?: DerivatedErrorConstructor) {
    super(params)
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