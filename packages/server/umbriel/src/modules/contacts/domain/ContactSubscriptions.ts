import { WatchedList } from '@server/shared/src/core/domain/WatchedList';

import { ContactSubscription } from './ContactSubscription';

export class ContactSubscriptions extends WatchedList<ContactSubscription> {
  private constructor(initialSubscriptions: ContactSubscription[]) {
    super(initialSubscriptions);
  }

  public compareItems(a: ContactSubscription, b: ContactSubscription): boolean {
    return a.equals(b);
  }

  public static create(
    subscriptions?: ContactSubscription[]
  ): ContactSubscriptions {
    return new ContactSubscriptions(subscriptions || []);
  }
}
