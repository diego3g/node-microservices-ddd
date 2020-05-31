import client from '@shared/infra/prisma/client';
import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';

export default class UsersRepository implements IUsersRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await client.user.create({
      data,
    });

    return user;
  }
}
