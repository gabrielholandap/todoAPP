import type { User } from '../entities';
import type {
  GetManyResponse,
  GetSingleResponse,
  CreateResponse,
  UpdateResponse,
  DeleteResponse
} from '../shared';

import type { Prisma } from '@prisma/client'

export type GetManyUsersParams = Prisma.UserFindManyArgs
export type GetSingleUserParams = Prisma.UserFindFirstArgs
export type CreateUserParams = Prisma.UserCreateArgs
export type UpdateUserParams = Prisma.UserUpdateArgs
export type DeleteUserParams = Prisma.UserDeleteArgs

export type GetManyUsersResponse<Result = any> = Promise<GetManyResponse<Result>>
export type GetSingleUserResponse<Result = any> = Promise<GetSingleResponse<Result>>
export type CreateUserResponse<Result = any> = Promise<CreateResponse<Result>>
export type UpdateUserResponse<Result = any> = Promise<UpdateResponse<Result>>
export type DeleteUserResponse<Result = any> = Promise<DeleteResponse<Result>>

export interface IUserRepository {
  getMany<Result = User>(params: GetManyUsersParams): GetManyUsersResponse<Result>
  getSingle<Result = User>(params: GetSingleUserParams): GetSingleUserResponse<Result>
  create<Result = User>(params: CreateUserParams): CreateUserResponse<Result>
  update<Result = User>(params: UpdateUserParams): UpdateUserResponse<Result>
  delete<Result = User>(params: DeleteUserParams): DeleteUserResponse<Result>
}