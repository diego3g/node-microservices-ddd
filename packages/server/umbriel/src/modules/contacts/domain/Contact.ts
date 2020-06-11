import AggregateRoot from '@server/shared/src/core/domain/AggregateRoot';
import UniqueEntityID from '@server/shared/src/core/domain/UniqueEntityID';
import Guard from '@server/shared/src/core/logic/Guard';
import Result from '@server/shared/src/core/logic/Result';

import ContactEmail from './ContactEmail';

interface IContactProps {
  email: ContactEmail;
}

export default class Contact extends AggregateRoot<IContactProps> {
  get email(): ContactEmail {
    return this.props.email;
  }

  private constructor(props: IContactProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: IContactProps,
    id?: UniqueEntityID
  ): Result<Contact> {
    const guardedProps = [{ argument: props.email, argumentName: 'email' }];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Contact>(guardResult.message);
    }

    const contact = new Contact(props, id);

    return Result.ok<Contact>(contact);
  }
}
