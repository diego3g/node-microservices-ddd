import User from '../domain/User';

export default interface IUserRepo {
  exists(email: string): Promise<boolean>;
  save(user: User): Promise<void>;
}
