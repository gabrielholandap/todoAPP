import { TodoController } from "../modules/todo/controllers/todo";
import { TodoUseCases } from "../modules/todo/use-cases/todo";
import { TodoRepository } from "../modules/todo/repositories/prisma/todo";
import { UserRepository } from "../modules/user/repositories/prisma/user";

export class TodoControllerFactory {
  static handle() {
    const userRepository = new UserRepository()
    const todoRepository = new TodoRepository()
    const todoUseCases = new TodoUseCases({ userRepository, todoRepository })
    return new TodoController({ todoUseCases })
  }
}