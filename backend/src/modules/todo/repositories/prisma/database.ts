import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export class Database {
	database: PrismaClient;

	constructor() {
		this.database =	prismaClient;
	}
}