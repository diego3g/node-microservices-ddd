import { UniqueEntityID } from '@server/shared/src/core/domain/UniqueEntityID';

import { Contact as PersistenceContact } from '.prisma/client';

import { Contact } from '../domain/Contact';
import { ContactEmail } from '../domain/ContactEmail';
import { IGetContactsResponseDTO } from '../useCases/contacts/getContacts/GetContactsDTO';

export class ContactMap {
  static toDomain(raw: PersistenceContact): Contact {
    const contactEmailOrError = ContactEmail.create(raw.email);

    const userOrError = Contact.create(
      {
        email: contactEmailOrError.getValue(),
      },
      new UniqueEntityID(raw.id)
    );

    if (userOrError.isFailure) {
      console.log(userOrError.error);
    }

    if (userOrError.isSuccess) {
      return userOrError.getValue();
    }

    return null;
  }

  static toPersistence(
    contact: Contact
  ): Pick<PersistenceContact, 'id' | 'email'> {
    return {
      id: contact.id.toValue(),
      email: contact.email.value,
    };
  }

  static toDTO(contact: Contact): IGetContactsResponseDTO {
    return {
      id: contact.id.toValue(),
      email: contact.email.value,
    };
  }
}
