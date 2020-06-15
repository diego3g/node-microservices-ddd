import { ContactSubscription } from '../domain/ContactSubscription';
import { ContactSubscriptions } from '../domain/ContactSubscriptions';

export interface IContactSubscriptionsRepo {
  save(subscription: ContactSubscription): Promise<void>;
  saveBulk(subscriptions: ContactSubscriptions): Promise<void>;
  delete(subscription: ContactSubscription): Promise<void>;
}
