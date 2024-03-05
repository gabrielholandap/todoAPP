import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTodoDTO {    
  @IsNotEmpty()
  @IsString()
  title!: string
  
  @IsOptional()
  @IsString()
  description?: string
}