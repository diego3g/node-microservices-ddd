import UniqueEntityID from '@core/domain/UniqueEntityID';
import { User as PersistenceUser } from '@prisma/client';

import User from '../domain/User';
import UserEmail from '../domain/UserEmail';
import UserPassword from '../domain/UserPassword';

export default class UserMap {
  public static toDomain(raw: PersistenceUser): User {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true,
    });

    const userOrError = User.create(
      {
        name: raw.name,
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
      },
      new UniqueEntityID(raw.id)
    );

    if (userOrError.isFailure) {
      console.log(userOrError.error);
    }

    if (userOrError.isSuccess) {
      return userOrError.getValue();
    }

    return null;
  }

  public static async toPersistence(user: User): Promise<PersistenceUser> {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.value,
      password: await user.password.getHashedValue(),
    };
  }
}
