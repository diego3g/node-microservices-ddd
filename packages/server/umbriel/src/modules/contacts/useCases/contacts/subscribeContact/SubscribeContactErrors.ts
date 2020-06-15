import { Result } from '@server/shared/src/core/logic/Result';
import { UseCaseError } from '@server/shared/src/core/logic/UseCaseError';

export class ContactAlreadyExists extends Result<UseCaseError> {
  constructor(email: string) {
    super(false, {
      message: `The email ${email} associated for this contact already exists`,
    });
  }
}
