type ApiErrorConstructor = {
  message?: string
  status?: number
}
type DerivatedErrorConstructor = {
  message?: string
}

export class ApiError extends Error {
  name: string = "ApiError"
  message: string = "Something wrong ocurred"
  status: number = 400

  constructor(params?: ApiErrorConstructor) {
    super()

    if (params?.message) {
      this.message = params.message
    }
    if (params?.status) {
      this.status = params.status
    }
  }
}

export class BadRequestError extends ApiError {
  name: string = "BadRequestError"
  
  constructor(params?: DerivatedErrorConstructor) {
    super(params)
  }
}

export class NotFoundError extends ApiError {
  name: string = "NotFoundError"
  status: number = 404
  
  constructor(params?: DerivatedErrorConstructor) {
    super(params)
  }
}

export class UnauthorizedError extends ApiError {
  name: string = "UnauthorizedError"
  status: number = 401

  constructor(params?: DerivatedErrorConstructor) {
    super(params)
  }
}