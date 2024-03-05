import type { ITodoRepository, IUserRepository } from '../../../domain/interfaces';
import { NotFoundError, UnauthorizedError } from '../../../shared/errors';

type TodoUseCasesConstructor = {
  todoRepository: ITodoRepository
  userRepository: IUserRepository
}

type BaseParams = {
  userId: string
}

type GetManyParams = Parameters<ITodoRepository["getMany"]>[0]
type CreateParams = Parameters<ITodoRepository["create"]>[0]
type UpdateParams = {
  query: Parameters<ITodoRepository["update"]>[0],
} & BaseParams
type DeleteParams = {
  query: Parameters<ITodoRepository["delete"]>[0],
} & BaseParams

type GetSingleWithOwneringValidationParams = {
  query: Parameters<ITodoRepository["getSingle"]>[0]
} & BaseParams

export class TodoUseCases {
	private todoRepository: ITodoRepository;
	private userRepository: IUserRepository;

	constructor({ todoRepository, userRepository }: TodoUseCasesConstructor) {
		this.todoRepository = todoRepository;
		this.userRepository = userRepository;
	}

	async getMany(params: GetManyParams) {
		const result = await this.todoRepository.getMany(params);

    return result
	}
	async create(params: CreateParams) {
		const result = await this.todoRepository.create(params);

    return result
	}
	async update({ userId, query }: UpdateParams) {
    await this.getSingleWithOwneringValidation({ 
      userId, 
      query: { 
        where: query.where, 
        select: { id: true } 
      }
    })

		const result = await this.todoRepository.update(query);

    return result
	}
	async delete({ userId, query }: DeleteParams) {
    await this.getSingleWithOwneringValidation({ 
      userId, 
      query: { 
        where: query.where, 
        select: { id: true } 
      }
    })

		const result = await this.todoRepository.delete(query);

    return result
	}

  private async getSingleWithOwneringValidation({ query, userId }: GetSingleWithOwneringValidationParams) {
    const [user, todo] = await Promise.all([
      this.userRepository.getSingle({ 
        where: {
          id: userId 
        },
        select: {
          id: true
        }
      }),
      this.todoRepository.getSingle(query),
    ])

    if (!user || !todo) {
      throw new NotFoundError()
    }
    if (todo.userId !== user.id) {
      throw new UnauthorizedError()
    }

    return todo
  }
}