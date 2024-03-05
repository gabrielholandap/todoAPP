import { Request, Response } from 'express';

import type { AuthUseCases } from '../use-cases/auth';
import { dtoValidator } from '../../../shared/middlewares/dto-validator';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { ExceptionsCatcher } from '../../../shared/middlewares/error-handler';

type AuthControllerConstructor = {
  authUseCases: AuthUseCases
}

export class AuthController {
	private authUseCases: AuthUseCases;

	constructor({ authUseCases }: AuthControllerConstructor) {
		this.authUseCases = authUseCases;
	}

	@ExceptionsCatcher()
	async signIn(req: Request, res: Response) {
    const body: any = req.body

    const parsedBody = await dtoValidator(body, SignInDTO)

		const result = await this.authUseCases.signIn(parsedBody);

		return res.json(result)
	}

	@ExceptionsCatcher()
	async signUp(req: Request, res: Response) {
    const body: any = req.body

    const parsedBody = await dtoValidator(body, SignUpDTO)

		const result = await this.authUseCases.signUp(parsedBody);

		return res.json(result)
	}

	@ExceptionsCatcher()
	async refreshToken(req: Request, res: Response) {
    const body: any = req.body

    const parsedBody = await dtoValidator(body, RefreshTokenDTO)

		const result = await this.authUseCases.refreshToken(parsedBody);

		return res.json(result)
	}
}