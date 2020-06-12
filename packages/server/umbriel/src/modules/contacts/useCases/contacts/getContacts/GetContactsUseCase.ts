import { IUseCase } from '@server/shared/src/core/domain/UseCase';
import * as GenericAppError from '@server/shared/src/core/logic/AppError';
import {
  Result,
  failure,
  Either,
  success,
} from '@server/shared/src/core/logic/Result';

import { Contact } from '@modules/contacts/domain/Contact';
import { IContactRepo } from '@modules/contacts/repositories/IContactRepo';

type Response = Either<GenericAppError.UnexpectedError, Result<Contact[]>>;

export class GetContactsUseCase implements IUseCase<void, Promise<Response>> {
  private contactRepo: IContactRepo;

  constructor(contactRepo: IContactRepo) {
    this.contactRepo = contactRepo;
  }

  async execute(): Promise<Response> {
    try {
      const contacts = await this.contactRepo.getContacts();

      return success(Result.ok(contacts));
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }
  }
}
