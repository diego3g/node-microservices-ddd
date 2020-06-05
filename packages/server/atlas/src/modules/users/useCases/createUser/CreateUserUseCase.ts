import { IUseCase } from '@core/domain/UseCase';
import User from '@modules/users/domain/User';
import IUserRepo from '@modules/users/repositories/IUserRepo';
import Result, { left, Either, right } from '@core/logic/Result';
import * as GenericAppError from '@core/logic/AppError';
import ICreateUserDTO from './ICreateUserDTO';
import * as CreateUserErrors from './CreateUserErrors';

type Response = Either<
  | GenericAppError.UnexpectedError
  | CreateUserErrors.AccountAlreadyExists
  | Result<any>,
  Result<void>
>;

export default class CreateUserUseCase
  implements IUseCase<ICreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(req: ICreateUserDTO): Promise<Response> {
    const { name, email, password } = req;

    const userOrError = User.create({
      name,
      email,
      password,
    });

    if (userOrError.isFailure) {
      return left(Result.fail<void>(userOrError.error));
    }

    const user: User = userOrError.getValue();

    const userAlreadyExists = await this.userRepo.exists(user.email);

    if (userAlreadyExists) {
      return left(new CreateUserErrors.AccountAlreadyExists(user.email));
    }

    try {
      await this.userRepo.save(user);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err));
    }

    return right(Result.ok());
  }
}
