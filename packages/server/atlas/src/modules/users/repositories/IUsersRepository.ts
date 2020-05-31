import ICreateUserDTO from '../dtos/CreateUserDTO';
import User from '../entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
}
