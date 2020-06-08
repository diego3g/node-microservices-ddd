// import FakeUserRepo from '@modules/users/repositories/fakes/FakeUserRepo';
import PrismaUserRepo from '@modules/users/infra/prisma/PrismaUserRepo';

import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

// const fakeUserRepo = new FakeUserRepo();
const prismaUserRepo = new PrismaUserRepo();

const loginUseCase = new LoginUseCase(prismaUserRepo);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
