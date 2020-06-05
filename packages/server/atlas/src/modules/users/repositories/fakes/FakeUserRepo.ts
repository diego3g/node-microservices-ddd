import User from '@modules/users/domain/User';
import IUserRepo from '../IUserRepo';

export default class FakeUserRepo implements IUserRepo {
  private users: User[] = [];

  public async exists(email: string): Promise<boolean> {
    return this.users.some((user) => user.email === email);
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
