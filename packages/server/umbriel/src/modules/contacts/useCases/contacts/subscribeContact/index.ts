import { PrismaContactRepo } from '@modules/contacts/infra/prisma/PrismaContactRepo';
import { PrismaContactSubscriptionsRepo } from '@modules/contacts/infra/prisma/PrismaContactSubscriptionsRepo';
import { PrismaTagRepo } from '@modules/contacts/infra/prisma/PrismaTagRepo';

import { SubscribeContactUseCase } from './SubscribeContactUseCase';

const prismaContactSubscriptionRepo = new PrismaContactSubscriptionsRepo();
const prismaTagRepo = new PrismaTagRepo();
const prismaContactRepo = new PrismaContactRepo(prismaContactSubscriptionRepo);

const subscribeContactUseCase = new SubscribeContactUseCase(
  prismaContactRepo,
  prismaTagRepo
);

export { subscribeContactUseCase };
