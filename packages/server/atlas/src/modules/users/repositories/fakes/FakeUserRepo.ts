import User from '@modules/users/domain/User';
import IUserRepo from '../IUserRepo';

export default class FakeUserRepo implements IUserRepo {
  private users: User[] = [];

  public async exists(): Promise<boolean> {
    return false;
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
