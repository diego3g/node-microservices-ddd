import JWT from '@modules/users/domain/JWT';
import UserEmail from '@modules/users/domain/UserEmail';
import UserPassword from '@modules/users/domain/UserPassword';
import IUserRepo from '@modules/users/repositories/IUserRepo';
import DomainEvents from '@server/shared/src/core/domain/events/DomainEvents';
import { IUseCase } from '@server/shared/src/core/domain/UseCase';
import * as GenericAppError from '@server/shared/src/core/logic/AppError';
import Result, {
  failure,
  Either,
  success,
} from '@server/shared/src/core/logic/Result';

import { ILoginDTO, ILoginResponse } from './ILoginDTO';
import * as LoginErrors from './LoginErrors';

type Response = Either<
  | GenericAppError.UnexpectedError
  | LoginErrors.UserNameDoesntExistError
  | LoginErrors.PasswordDoesntMatchError,
  Result<ILoginResponse>
>;

export default class LoginUseCase
  implements IUseCase<ILoginDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: ILoginDTO): Promise<Response> {
    try {
      const userEmailOrError = UserEmail.create(request.email);
      const userPasswordOrError = UserPassword.create({
        value: request.password,
      });

      const result = Result.combine([userEmailOrError, userPasswordOrError]);

      if (result.isFailure) {
        return failure(Result.fail(result.error));
      }

      const email = userEmailOrError.getValue();
      const password = userPasswordOrError.getValue();

      const user = await this.userRepo.findByEmail(email);

      const userFound = !!user;

      if (!userFound) {
        return failure(new LoginErrors.UserNameDoesntExistError());
      }

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return failure(new LoginErrors.PasswordDoesntMatchError());
      }

      const accessTokenOrError = JWT.create(
        {
          sub: user.id.toValue(),
        },
        {
          name: user.name,
          email: user.email.value,
        }
      );

      if (accessTokenOrError.isFailure) {
        return failure(Result.fail(accessTokenOrError.error));
      }

      const { token } = accessTokenOrError.getValue();

      user.setAccessToken(token);

      DomainEvents.dispatchEventsForAggregate(user.id);

      return success(
        Result.ok({
          token,
        })
      );
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }
  }
}
