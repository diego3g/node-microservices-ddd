import DomainEvents from '@core/domain/events/DomainEvents';
import prisma from '@infra/prisma/client';
import User from '@modules/users/domain/User';
import { UserMap } from '@modules/users/mappers/UserMapper';
import IUserRepo from '@modules/users/repositories/IUserRepo';

export default class PrismaUserRepo implements IUserRepo {
  async exists(email: string): Promise<boolean> {
    const exists = await prisma.user.findOne({
      where: {
        email,
      },
    });

    return !!exists;
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);
    const data = UserMap.toPersistence(user);

    if (!exists) {
      await prisma.user.create({
        data,
      });
    } else {
      await prisma.user.update({
        where: { email: user.email },
        data,
      });
    }

    DomainEvents.dispatchEventsForAggregate(user.id);
  }
}
