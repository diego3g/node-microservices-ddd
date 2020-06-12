import { Result } from '@server/shared/src/core/logic/Result';
import { UseCaseError } from '@server/shared/src/core/logic/UseCaseError';

export class UserNotFoundError extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `User not found.`,
    } as UseCaseError);
  }
}
