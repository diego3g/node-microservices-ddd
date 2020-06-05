import Result from '@core/logic/Result';
import UseCaseError from '@core/logic/UseCaseError';

export class AccountAlreadyExists extends Result<UseCaseError> {
  constructor(email: string) {
    super(false, {
      message: `The email ${email} associated for this account already exists`,
    });
  }
}
