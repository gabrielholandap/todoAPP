import { IsOptional, IsString } from 'class-validator'

export class CreateTodoDTO {    
  @IsOptional()
  @IsString()
  title!: string
  
  @IsOptional()
  @IsString()
  description?: string
}