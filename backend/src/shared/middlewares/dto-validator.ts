import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"

import { ValidationError } from "../errors"

interface DTO<T> {
  new(data: { [key: string]: any }): T
}

export async function dtoValidator<T extends object>(data: { [key: string]: any }, dto: DTO<T>): Promise<T> {
  const entity = plainToInstance(dto, data)
  
  const errors = await validate(entity)

  if (errors.length > 0) throw new ValidationError({ errors })

  return entity
}