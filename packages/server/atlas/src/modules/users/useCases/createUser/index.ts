import FakeUserRepo from '@modules/users/repositories/fakes/FakeUserRepo';
import CreateUserUseCase from './CreateUserUseCase';
import CreateUserController from './CreateUserController';

const fakeUserRepo = new FakeUserRepo();
const createUserUseCase = new CreateUserUseCase(fakeUserRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
