import IUserRepo from '@modules/users/repositories/IUserRepo';
import prisma from '@infra/prisma/client';
import User from '@modules/users/domain/User';
import DomainEvents from '@core/domain/events/DomainEvents';
import { UserMap } from '@modules/users/mappers/UserMapper';

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
