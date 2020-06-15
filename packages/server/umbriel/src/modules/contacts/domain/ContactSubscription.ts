import { AggregateRoot } from '@server/shared/src/core/domain/AggregateRoot';
import { UniqueEntityID } from '@server/shared/src/core/domain/UniqueEntityID';
import { Guard } from '@server/shared/src/core/logic/Guard';
import { Result } from '@server/shared/src/core/logic/Result';

interface IContactSubscriptionProps {
  contactId: string;
  tagId: string;
  subscribed?: boolean;
}

export class ContactSubscription extends AggregateRoot<
  IContactSubscriptionProps
> {
  get contactId(): string {
    return this.props.contactId;
  }

  get tagId(): string {
    return this.props.tagId;
  }

  get subscribed(): boolean {
    return this.props.subscribed;
  }

  private constructor(props: IContactSubscriptionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: IContactSubscriptionProps,
    id?: UniqueEntityID
  ): Result<ContactSubscription> {
    const guardedProps = [
      { argument: props.contactId, argumentName: 'contactId' },
      { argument: props.tagId, argumentName: 'tagId' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message);
    }

    const subscription = new ContactSubscription(
      {
        ...props,
        subscribed: props.subscribed || true,
      },
      id
    );

    return Result.ok(subscription);
  }
}
