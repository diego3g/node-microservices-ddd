import DomainEvents from '@server/shared/src/core/domain/events/DomainEvents';
import { IHandle } from '@server/shared/src/core/domain/events/IHandle';

import UserCreatedEvent from '../domain/events/UserCreatedEvent';
import SubscribeUserToMailingUseCase from '../useCases/subscribeUserToMailing/SubscribeUserToMailingUseCase';

export default class AfterUserCreated implements IHandle<UserCreatedEvent> {
  private subscribeUserToMailing: SubscribeUserToMailingUseCase;

  constructor(subscribeUserToMailing: SubscribeUserToMailingUseCase) {
    this.setupSubscriptions();

    this.subscribeUserToMailing = subscribeUserToMailing;
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.onUserCreatedEvent.bind(this),
      UserCreatedEvent.name
    );
  }

  private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
    const { user } = event;

    this.subscribeUserToMailing.execute({
      userId: user.id.toValue(),
    });
  }
}
