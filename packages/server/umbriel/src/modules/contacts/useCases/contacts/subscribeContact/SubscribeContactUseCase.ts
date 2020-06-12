import { IUseCase } from '@server/shared/src/core/domain/UseCase';
import * as GenericAppError from '@server/shared/src/core/logic/AppError';
import {
  Result,
  failure,
  Either,
  success,
} from '@server/shared/src/core/logic/Result';

import { Contact } from '@modules/contacts/domain/Contact';
import { ContactEmail } from '@modules/contacts/domain/ContactEmail';
import { IContactRepo } from '@modules/contacts/repositories/IContactRepo';

import { ISubscribeContactRequestDTO } from './SubscribeContactDTO';

type Response = Either<GenericAppError.UnexpectedError, Result<void>>;

export class SubscribeContactUseCase
  implements IUseCase<ISubscribeContactRequestDTO, Promise<Response>> {
  private contactRepo: IContactRepo;

  constructor(contactRepo: IContactRepo) {
    this.contactRepo = contactRepo;
  }

  async execute(request: ISubscribeContactRequestDTO): Promise<Response> {
    const contactEmailOrError = ContactEmail.create(request.email);

    if (contactEmailOrError.isFailure) {
      return failure(Result.fail(contactEmailOrError.error));
    }

    const contactOrError = Contact.create({
      email: contactEmailOrError.getValue(),
    });

    if (contactOrError.isFailure) {
      return failure(Result.fail(contactOrError.error));
    }

    const contact = contactOrError.getValue();

    try {
      await this.contactRepo.save(contact);
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }

    return success(Result.ok());
  }
}
