import Result from '@server/shared/src/core/logic/Result';
import UseCaseError from '@server/shared/src/core/logic/UseCaseError';

export class AccountAlreadyExists extends Result<UseCaseError> {
  constructor(email: string) {
    super(false, {
      message: `The email ${email} associated for this account already exists`,
    });
  }
}
