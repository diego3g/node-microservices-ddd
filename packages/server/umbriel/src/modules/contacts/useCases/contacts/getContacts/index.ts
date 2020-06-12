import PrismaContactRepo from '@modules/contacts/infra/prisma/PrismaContactRepo';

import GetContactsController from './GetContactsController';
import GetContactsUseCase from './GetContactsUseCase';

const prismaContactRepo = new PrismaContactRepo();

const getContactsUseCase = new GetContactsUseCase(prismaContactRepo);
const getContactsController = new GetContactsController(getContactsUseCase);

export { getContactsUseCase, getContactsController };
