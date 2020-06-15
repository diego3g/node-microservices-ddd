import { prisma } from '@infra/prisma/client';

import { subscribeContactUseCase } from '.';

describe('Subscribe Contact', () => {
  afterAll(async () => {
    await prisma.disconnect();
  });

  it('should be able to subscribe new contact', async () => {
    await subscribeContactUseCase.execute({
      email: 'diego@rocketseat.com.br',
      tags: [
        { title: 'GoStack 10.0', integrationId: '123456' },
        { title: 'GoStack 11.0', integrationId: '441234' },
        { title: 'GoStack 12.0', integrationId: '124125' },
      ],
    });
  });
});
