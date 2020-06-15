import { ContactTags as PersistenceSubscription } from '.prisma/client';

import { ContactSubscription } from '../domain/ContactSubscription';

export class ContactSubscriptionMap {
  static toPersistence(
    contactSubscription: ContactSubscription
  ): Partial<PersistenceSubscription> {
    return {
      id: contactSubscription.id.toValue(),
      contactId: contactSubscription.contactId,
      tagId: contactSubscription.tagId,
      subscribed: contactSubscription.subscribed,
    };
  }
}
