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
} from '../../../../domain/interfaces/todo';

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
	async getSingle(params: GetSingleTodoParams): GetSingleTodoResponse {
		const result = await this.database.todo.findFirst(params)

		return result
	}
	async create(params: CreateTodoParams): CreateTodoResponse {
		const result = await this.database.todo.create(params)

		return result
	}
	async update(params: UpdateTodoParams): UpdateTodoResponse {
		const result = await this.database.todo.update(params)

		return result
	}
	async delete(params: DeleteTodoParams): DeleteTodoResponse {
		const result = await this.database.todo.delete(params)

		return result
	}
}