import DomainEvents from '@core/domain/events/DomainEvents';
import prisma from '@infra/prisma/client';
import User from '@modules/users/domain/User';
import UserEmail from '@modules/users/domain/UserEmail';
import UserMap from '@modules/users/mappers/UserMap';
import IUserRepo from '@modules/users/repositories/IUserRepo';

export default class PrismaUserRepo implements IUserRepo {
  async findByEmail(email: string | UserEmail): Promise<User> {
    const rawUser = await prisma.user.findOne({
      where: {
        email: email instanceof UserEmail ? email.value : email,
      },
    });

    if (!rawUser) {
      return null;
    }

    return UserMap.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    const exists = !!(await this.findByEmail(user.email.value));
    const data = await UserMap.toPersistence(user);

    if (!exists) {
      await prisma.user.create({
        data,
      });
    } else {
      await prisma.user.update({
        where: { email: user.email.value },
        data,
      });
    }

    DomainEvents.dispatchEventsForAggregate(user.id);
  }
}
