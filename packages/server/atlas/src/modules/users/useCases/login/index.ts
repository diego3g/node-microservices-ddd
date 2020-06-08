import PrismaUserRepo from '@modules/users/infra/prisma/PrismaUserRepo';

import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

const prismaUserRepo = new PrismaUserRepo();

const loginUseCase = new LoginUseCase(prismaUserRepo);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
