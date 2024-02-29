import { Database } from './database';
import type { 
	ITodoRepository, 
	GetManyTodosParams, 
	GetManyTodosResponse, 
	GetSingleTodoParams, 
	GetSingleTodoResponse, 
	CreateTodoParams,
	CreateTodoResponse,
	UpdateTodoParams,
	UpdateTodoResponse,
	DeleteTodoParams,
	DeleteTodoResponse
} from '../../../domain/interfaces/todo';

export class TodoRepository extends Database implements ITodoRepository {
	async getMany(params: GetManyTodosParams): GetManyTodosResponse {
		const [results, total] = await Promise.all([
			this.database.todo.findMany(params),
			this.database.todo.count({
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
	async getSingle({ where }: GetSingleTodoParams): GetSingleTodoResponse {
		const result = await this.database.todo.findFirst({ where })

		return result
	}
	async create({ data }: CreateTodoParams): CreateTodoResponse {
		const result = await this.database.todo.create({
			data
		})

		return result
	}
	async update({ where, data }: UpdateTodoParams): UpdateTodoResponse {
		const result = await this.database.todo.update({
			where,
			data
		})

		return result
	}
	async delete({ where }: DeleteTodoParams): DeleteTodoResponse {
		const result = await this.database.todo.delete({
			where,
		})

		return result
	}
}