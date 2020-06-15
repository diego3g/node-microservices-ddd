import { DomainEvents } from '@server/shared/src/core/domain/events/DomainEvents';

import { prisma } from '@infra/prisma/client';
import { ContactSubscription } from '@modules/contacts/domain/ContactSubscription';
import { ContactSubscriptions } from '@modules/contacts/domain/ContactSubscriptions';
import { ContactSubscriptionMap } from '@modules/contacts/mappers/ContactSubscriptionMap';
import { IContactSubscriptionsRepo } from '@modules/contacts/repositories/IContactSubscriptionsRepo';

export class PrismaContactSubscriptionsRepo
  implements IContactSubscriptionsRepo {
  async save(subscription: ContactSubscription): Promise<void> {
    const subscriptionData = ContactSubscriptionMap.toPersistence(subscription);

    const prismaInput = {
      id: subscriptionData.id,
      subscribed: subscriptionData.subscribed,
      contact: {
        connect: {
          id: subscriptionData.contactId,
        },
      },
      tag: {
        connect: {
          id: subscriptionData.tagId,
        },
      },
    };

    await prisma.contactTags.upsert({
      where: { id: subscriptionData.id },
      update: prismaInput,
      create: prismaInput,
    });

    DomainEvents.dispatchEventsForAggregate(subscription.id);
  }

  async saveBulk(subscriptions: ContactSubscriptions): Promise<void> {
    const removedItemsPromise = Promise.all(
      subscriptions.getRemovedItems().map((subscription) => {
        return this.delete(subscription);
      })
    );

    const newItemsPromise = Promise.all(
      subscriptions.getNewItems().map((subscription) => {
        return this.save(subscription);
      })
    );

    await Promise.all([removedItemsPromise, newItemsPromise]);
  }

  async delete(subscription: ContactSubscription): Promise<void> {
    const subscriptionData = ContactSubscriptionMap.toPersistence(subscription);

    await prisma.contactTags.delete({
      where: {
        id: subscriptionData.id,
      },
    });
  }
}
