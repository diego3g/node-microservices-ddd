import IDomainEvent from '@server/shared/src/core/domain/events/IDomainEvent';
import UniqueEntityID from '@server/shared/src/core/domain/UniqueEntityID';

import User from '../User';

export default class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;

  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
