import Result from '@server/shared/src/core/logic/Result';
import UseCaseError from '@server/shared/src/core/logic/UseCaseError';

export class UserNameDoesntExistError extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Username or password incorrect.`,
    } as UseCaseError);
  }
}

export class PasswordDoesntMatchError extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Password doesn't match.`,
    } as UseCaseError);
  }
}
