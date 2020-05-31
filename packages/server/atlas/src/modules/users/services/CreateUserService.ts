import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';
import User from '../entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
