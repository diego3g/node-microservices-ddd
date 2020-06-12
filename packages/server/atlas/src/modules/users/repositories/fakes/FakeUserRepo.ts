import { User } from '@modules/users/domain/User';
import { UserEmail } from '@modules/users/domain/UserEmail';

import { IUserRepo } from '../IUserRepo';

export default class FakeUserRepo implements IUserRepo {
  private users: User[] = [];

  public async findByEmail(email: string | UserEmail): Promise<User> {
    return this.users.find((user) => {
      return email instanceof UserEmail
        ? user.email.value === email.value
        : user.email.value === email;
    });
  }

  public async findById(id: string): Promise<User> {
    return this.users.find((user) => {
      return user.id.toValue() === id;
    });
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
