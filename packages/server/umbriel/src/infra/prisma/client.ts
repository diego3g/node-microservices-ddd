import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
  log: ['query'],
});

export default client;
