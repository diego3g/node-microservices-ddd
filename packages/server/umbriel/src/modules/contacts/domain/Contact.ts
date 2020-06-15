import { AggregateRoot } from '@server/shared/src/core/domain/AggregateRoot';
import { UniqueEntityID } from '@server/shared/src/core/domain/UniqueEntityID';
import { Guard } from '@server/shared/src/core/logic/Guard';
import { Result } from '@server/shared/src/core/logic/Result';

import { ContactEmail } from './ContactEmail';
import { ContactSubscription } from './ContactSubscription';
import { ContactSubscriptions } from './ContactSubscriptions';
import { Tag } from './Tag';

interface IContactProps {
  email: ContactEmail;
  subscriptions?: ContactSubscriptions;
}

export class Contact extends AggregateRoot<IContactProps> {
  get email(): ContactEmail {
    return this.props.email;
  }

  get subscriptions(): ContactSubscriptions {
    return this.props.subscriptions;
  }

  private constructor(props: IContactProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public addSubscription(tag: Tag): Result<void> {
    const subscriptionOrError = ContactSubscription.create({
      contactId: this.id.toValue(),
      tagId: tag.id.toValue(),
    });

    if (subscriptionOrError.isFailure) {
      return Result.fail(subscriptionOrError.error);
    }

    this.props.subscriptions.add(subscriptionOrError.getValue());

    return Result.ok<void>();
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

    const defaultValues: IContactProps = {
      ...props,
      subscriptions: props.subscriptions || ContactSubscriptions.create([]),
    };

    const contact = new Contact(defaultValues, id);

    return Result.ok<Contact>(contact);
  }
}
