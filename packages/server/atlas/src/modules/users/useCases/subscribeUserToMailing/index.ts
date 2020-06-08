import PrismaUserRepo from '@modules/users/infra/prisma/PrismaUserRepo';
import { UmbrielService } from '@modules/users/services';

import SubscribeUserToMailingUseCase from './SubscribeUserToMailingUseCase';

const prismaUserRepo = new PrismaUserRepo();
const umbrielService = new UmbrielService();

const subscribeUserToMailingUseCase = new SubscribeUserToMailingUseCase(
  prismaUserRepo,
  umbrielService
);

export { subscribeUserToMailingUseCase };
