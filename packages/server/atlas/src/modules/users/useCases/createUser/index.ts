// import FakeUserRepo from '@modules/users/repositories/fakes/FakeUserRepo';
import PrismaUserRepo from '@modules/users/infra/prisma/PrismaUserRepo';
import CreateUserUseCase from './CreateUserUseCase';
import CreateUserController from './CreateUserController';

// const fakeUserRepo = new FakeUserRepo();
const prismaUserRepo = new PrismaUserRepo();

const createUserUseCase = new CreateUserUseCase(prismaUserRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
