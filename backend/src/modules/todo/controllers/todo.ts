import { Request, Response } from 'express';

import type { TodoUseCases } from '../use-cases/todo';
import { dtoValidator } from '../../../shared/middlewares/dto-validator';
import { CreateTodoDTO } from './dto/create.dto';
import { ExceptionsCatcher } from '../../../shared/middlewares/error-handler';
import { AuthGuard } from '../../../shared/middlewares/auth-middleware';

type TodoControllerConstructor = {
  todoUseCases: TodoUseCases
}

export class TodoController {
	private todoUseCases: TodoUseCases;

	constructor({ todoUseCases }: TodoControllerConstructor) {
		this.todoUseCases = todoUseCases;
	}

	@AuthGuard()
	@ExceptionsCatcher()
	async getMany(req: Request, res: Response) {
    const { skip = 0, take = 10 } = req.query

		const parsedSkip = Number(skip)
		const parsedTake = Number(take)

		const result = await this.todoUseCases.getMany({ take: parsedTake, skip: parsedSkip });

		return res.json(result)
	}

	@AuthGuard()
	@ExceptionsCatcher()
	async create(req: Request, res: Response) {
    const bodyData = req.body
    const userId = req.userData?.id!

    const parsedBody = await dtoValidator(bodyData, CreateTodoDTO)

		const result = await this.todoUseCases.create({
			data: {
				...parsedBody,
				user: {
					connect: { id: userId }
				} 
			} 
		});

		return res.json(result)
	}
	
	@AuthGuard()
	@ExceptionsCatcher()
	async update(req: Request, res: Response) {
    const todoId = req.params.id
    const bodyData = req.body
    const userId = req.userData?.id!

    const parsedBody = await dtoValidator(bodyData, CreateTodoDTO)

		const result = await this.todoUseCases.update({
			query: {
				where: { id: todoId },
				data: parsedBody,
			},
			userId
		});

		return res.json(result)
	}

	@AuthGuard()
	@ExceptionsCatcher()
	async delete(req: Request, res: Response) {
    const todoId = req.params.id
    const userId = req.userData?.id!

		const result = await this.todoUseCases.delete({
			query: {
				where: { id: todoId },
			},
			userId
		});

		return res.json(result)
	}
}