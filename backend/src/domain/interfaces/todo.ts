import type { Todo } from '../entities';
import type {
  GetManyResponse,
  GetSingleResponse,
  CreateResponse,
  UpdateResponse,
  DeleteResponse
} from '../shared';

import type { Prisma } from '@prisma/client'

export type GetManyTodosParams = Prisma.TodoFindManyArgs
export type GetSingleTodoParams = Prisma.TodoFindFirstArgs
export type CreateTodoParams = Prisma.TodoCreateArgs
export type UpdateTodoParams = Prisma.TodoUpdateArgs
export type DeleteTodoParams = Prisma.TodoDeleteArgs

export type GetManyTodosResponse<Result = any> = Promise<GetManyResponse<Result>>
export type GetSingleTodoResponse<Result = any> = Promise<GetSingleResponse<Result>>
export type CreateTodoResponse<Result = any> = Promise<CreateResponse<Result>>
export type UpdateTodoResponse<Result = any> = Promise<UpdateResponse<Result>>
export type DeleteTodoResponse<Result = any> = Promise<DeleteResponse<Result>>

export interface ITodoRepository {
  getMany<Result = Todo>(params: GetManyTodosParams): GetManyTodosResponse<Result>
  getSingle<Result = Todo>(params: GetSingleTodoParams): GetSingleTodoResponse<Result>
  create<Result = Todo>(params: CreateTodoParams): CreateTodoResponse<Result>
  update<Result = Todo>(params: UpdateTodoParams): UpdateTodoResponse<Result>
  delete<Result = Todo>(params: DeleteTodoParams): DeleteTodoResponse<Result>
}