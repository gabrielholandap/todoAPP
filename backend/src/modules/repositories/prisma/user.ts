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
} from '../../../domain/interfaces/user';

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
	async getSingle({ where }: GetSingleUserParams): GetSingleUserResponse {
		const result = await this.database.user.findFirst({ where })

		return result
	}
	async create({ data }: CreateUserParams): CreateUserResponse {
		const result = await this.database.user.create({
			data
		})

		return result
	}
	async update({ where, data }: UpdateUserParams): UpdateUserResponse {
		const result = await this.database.user.update({
			where,
			data
		})

		return result
	}
	async delete({ where }: DeleteUserParams): DeleteUserResponse {
		const result = await this.database.user.delete({
			where,
		})

		return result
	}
}