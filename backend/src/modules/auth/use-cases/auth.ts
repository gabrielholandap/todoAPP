import { 
  JwtPayload,
  sign as signJwt, 
  verify as verifyJwt,
} from 'jsonwebtoken'
import { pbkdf2Sync } from 'node:crypto'

import type { IUserRepository } from '../../../domain/interfaces';
import { ENV_VARS } from '../../../shared/env-vars';
import { JWT_AUTH_TOKEN_EXPIRATION, JWT_REFRESH_TOKEN_EXPIRATION } from '../../../shared/constants';
import { UnauthorizedError } from '../../../shared/errors';

type AuthUseCasesConstructor = {
  userRepository: IUserRepository
}

type SignInParams = {
  email: string
  password: string
}
type SignUpParams = {
  username: string
  email: string
  password: string
}
type RefreshTokenParams = {
  refreshToken: string
}
type GenerateTokensParams = {
  sub: string
}

export class AuthUseCases {
	private userRepository: IUserRepository;

	constructor({ userRepository }: AuthUseCasesConstructor) {
		this.userRepository = userRepository;
	}

	async signIn({ email, password }: SignInParams) {
		const user = await this.userRepository.getSingle({ where: { email } });

    if (!user) {
      throw new UnauthorizedError({ message: 'Email or password incorrects' })
    }

    const correctPassword = this.comparePassword(password, user.password)

    if (!correctPassword) {
      throw new UnauthorizedError({ message: 'Email or password incorrects' })
    }

    return this.generateTokens({ sub: user.id })
	}
	async signUp({ email, password, username }: SignUpParams) {
		const isEmailAlreadyInUse = await this.userRepository.getSingle({ where: { email } });

    if (isEmailAlreadyInUse) {
      throw new UnauthorizedError({ message: 'Email already in use' })
    }

    const encryptedPassword = this.encryptPassword(password)

    await this.userRepository.create({ 
      data: { 
        email, 
        password: encryptedPassword, 
      } 
    })

    return await this.signIn({ email, password })
	}
	async refreshToken({ refreshToken }: RefreshTokenParams) {
    const { sub: userId } = AuthUseCases.verifyJwtRefreshToken(refreshToken)

    if (!userId) {
      throw new UnauthorizedError({ message: 'Error on validate token' })
    }

    const user = await this.userRepository.getSingle({ where: { email: userId } });

    if (!user) {
      throw new UnauthorizedError({ message: 'Error on validate token' })
    }

    return this.generateTokens({ sub: userId })
	}
  
  private encryptPassword(password: string) {
    const hash = pbkdf2Sync(
      password, 
      ENV_VARS.passwordSalt,
      1000,
      64,
      'sha512'
    ).toString(`hex`);

    return hash
  }
  private comparePassword(comparedPassword: string, currentPasswordHash: string) {
    const hash = this.encryptPassword(comparedPassword)

    return currentPasswordHash === hash;
  }
  private generateTokens({ sub }: GenerateTokensParams) {
    const authToken = signJwt(
      { sub },
      ENV_VARS.jwt.accessTokenSecret,
      { expiresIn: JWT_AUTH_TOKEN_EXPIRATION }
    )
    const refreshToken = signJwt(
      { sub },
      ENV_VARS.jwt.refreshTokenSecret,
      { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION }
    )

    return {
      authToken,
      refreshToken
    }
  }

  static verifyJwtAccessToken(token: string) {
    return verifyJwt(token, ENV_VARS.jwt.accessTokenSecret) as JwtPayload
  }
  static verifyJwtRefreshToken(token: string) {
    return verifyJwt(token, ENV_VARS.jwt.refreshTokenSecret) as JwtPayload
  }
}