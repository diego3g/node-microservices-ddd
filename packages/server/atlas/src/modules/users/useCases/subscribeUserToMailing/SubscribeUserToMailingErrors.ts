import Result from '@core/logic/Result';
import UseCaseError from '@core/logic/UseCaseError';

export class UserNotFoundError extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `User not found.`,
    } as UseCaseError);
  }
}
