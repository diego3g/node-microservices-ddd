// import FakeUserRepo from '@modules/users/repositories/fakes/FakeUserRepo';
import PrismaContactRepo from '@modules/contacts/infra/prisma/PrismaContactRepo';

import SubscribeContactUseCase from './SubscribeContactUseCase';

const prismaContactRepo = new PrismaContactRepo();

const subscribeContactUseCase = new SubscribeContactUseCase(prismaContactRepo);

export { subscribeContactUseCase };
