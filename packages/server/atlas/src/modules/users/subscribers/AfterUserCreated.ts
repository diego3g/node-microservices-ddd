import DomainEvents from '@core/domain/events/DomainEvents';
import { IHandle } from '../../../core/domain/events/IHandle';
import UserCreatedEvent from '../domain/events/UserCreatedEvent';

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.onUserCreatedEvent.bind(this),
      UserCreatedEvent.name
    );
  }

  private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
    const { user } = event;

    console.log('created', user);
  }
}
