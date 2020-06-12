import { DomainEvents } from '@server/shared/src/core/domain/events/DomainEvents';
import { IHandle } from '@server/shared/src/core/domain/events/IHandle';

import { UserEmailChangedEvent } from '../domain/events/UserEmailChangedEvent';

export class AfterUserEmailChanged implements IHandle<UserEmailChangedEvent> {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.onUserEmailChangedEvent.bind(this),
      UserEmailChangedEvent.name
    );
  }

  private async onUserEmailChangedEvent(
    event: UserEmailChangedEvent
  ): Promise<void> {
    const { user } = event;

    console.log(user);
  }
}
