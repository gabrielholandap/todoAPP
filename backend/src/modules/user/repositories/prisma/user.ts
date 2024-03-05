import { Database } from './database';
import type { 
	IUserRepository, 
	GetManyUsersParams, 
	GetManyUsersResponse, 
	GetSingleUserParams, 
	GetSingleUserResponse, 
	CreateUserParams,
	CreateUserResponse,
	UpdateUserParams,
	UpdateUserResponse,
	DeleteUserParams,
	DeleteUserResponse
} from '../../../../domain/interfaces/user';

export class UserRepository extends Database implements IUserRepository {
	async getMany(params: GetManyUsersParams): GetManyUsersResponse {
		const [results, total] = await Promise.all([
			this.database.user.findMany(params),
			this.database.user.count({
				where: params?.where,
				take: params?.take,
				skip: params?.skip,
				cursor: params?.cursor,
				orderBy: params?.orderBy,
			}),
		]);

		return {
			results,
			pagination: {
				limit: params.take!,
				skip: params.skip!,
				total,
			}
		};
	}
	async getSingle(params: GetSingleUserParams): GetSingleUserResponse {
		const result = await this.database.user.findFirst(params)

		return result
	}
	async create(params: CreateUserParams): CreateUserResponse {
		const result = await this.database.user.create(params)

		return result
	}
	async update(params: UpdateUserParams): UpdateUserResponse {
		const result = await this.database.user.update(params)

		return result
	}
	async delete(params: DeleteUserParams): DeleteUserResponse {
		const result = await this.database.user.delete(params)

		return result
	}
}