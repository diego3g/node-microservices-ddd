import { IUseCase } from '@core/domain/UseCase';
import * as GenericAppError from '@core/logic/AppError';
import Result, { failure, Either, success } from '@core/logic/Result';
import User from '@modules/users/domain/User';
import UserEmail from '@modules/users/domain/UserEmail';
import UserPassword from '@modules/users/domain/UserPassword';
import IUserRepo from '@modules/users/repositories/IUserRepo';

import * as CreateUserErrors from './CreateUserErrors';
import ICreateUserDTO from './ICreateUserDTO';

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

  async execute(request: ICreateUserDTO): Promise<Response> {
    const userEmailOrError = UserEmail.create(request.email);
    const userPasswordOrError = UserPassword.create({
      value: request.password,
    });

    const result = Result.combine([userEmailOrError, userPasswordOrError]);

    if (result.isFailure) {
      return failure(Result.fail(result.error));
    }

    const userOrError = User.create({
      name: request.name,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
    });

    if (userOrError.isFailure) {
      return failure(Result.fail(userOrError.error));
    }

    const user = userOrError.getValue();

    const userAlreadyExists = await this.userRepo.exists(user.email);

    if (userAlreadyExists) {
      return failure(new CreateUserErrors.AccountAlreadyExists(user.email));
    }

    try {
      await this.userRepo.save(user);
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }

    return success(Result.ok());
  }
}
