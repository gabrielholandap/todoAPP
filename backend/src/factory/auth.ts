import { AuthController } from "../modules/auth/controllers/auth";
import { AuthUseCases } from "../modules/auth/use-cases/auth";
import { UserRepository } from "../modules/user/repositories/prisma/user";

export class AuthControllerFactory {
  static handle() {
    const userRepository = new UserRepository()
    const authUseCases = new AuthUseCases({ userRepository })
    return new AuthController({ authUseCases })
  }
}