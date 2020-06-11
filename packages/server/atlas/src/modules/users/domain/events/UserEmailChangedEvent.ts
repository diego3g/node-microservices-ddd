import IDomainEvent from '@server/shared/src/core/domain/events/IDomainEvent';
import UniqueEntityID from '@server/shared/src/core/domain/UniqueEntityID';

import User from '../User';
import UserEmail from '../UserEmail';

export default class UserEmailChangedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;

  public lastEmail: UserEmail;

  public user: User;

  constructor(user: User, lastEmail?: UserEmail) {
    this.dateTimeOccurred = new Date();
    this.user = user;
    this.lastEmail = lastEmail;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
