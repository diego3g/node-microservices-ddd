// import FakeUserRepo from '@modules/users/repositories/fakes/FakeUserRepo';
import PrismaUserRepo from '@modules/users/infra/prisma/PrismaUserRepo';

import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

// const fakeUserRepo = new FakeUserRepo();
const prismaUserRepo = new PrismaUserRepo();

const createUserUseCase = new CreateUserUseCase(prismaUserRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
