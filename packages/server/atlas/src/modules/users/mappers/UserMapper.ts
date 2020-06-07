import UniqueEntityID from '@core/domain/UniqueEntityID';
import User from '../domain/User';

export class UserMap {
  public static toDomain(raw: any): User {
    const userOrError = User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
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

  public static toPersistence(user: User): any {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
