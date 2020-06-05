import IUserRepo from '@modules/users/repositories/IUserRepo';
import prisma from '@infra/prisma/client';
import User from '@modules/users/domain/User';

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
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
