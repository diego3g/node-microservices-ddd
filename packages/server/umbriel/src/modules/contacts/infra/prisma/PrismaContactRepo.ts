import { DomainEvents } from '@server/shared/src/core/domain/events/DomainEvents';

import { prisma } from '@infra/prisma/client';
import { Contact } from '@modules/contacts/domain/Contact';
import { ContactEmail } from '@modules/contacts/domain/ContactEmail';
import { ContactSubscriptions } from '@modules/contacts/domain/ContactSubscriptions';
import { ContactMap } from '@modules/contacts/mappers/ContactMap';
import { IContactRepo } from '@modules/contacts/repositories/IContactRepo';
import { IContactSubscriptionsRepo } from '@modules/contacts/repositories/IContactSubscriptionsRepo';

export class PrismaContactRepo implements IContactRepo {
  private contactSubscriptionsRepo: IContactSubscriptionsRepo;

  constructor(contactSubscriptionRepo: IContactSubscriptionsRepo) {
    this.contactSubscriptionsRepo = contactSubscriptionRepo;
  }

  private saveSubscriptions(
    subscriptions: ContactSubscriptions
  ): Promise<void> {
    return this.contactSubscriptionsRepo.saveBulk(subscriptions);
  }

  async findByEmail(email: string | ContactEmail): Promise<Contact> {
    const rawContact = await prisma.contact.findOne({
      where: {
        email: email instanceof ContactEmail ? email.value : email,
      },
    });

    if (!rawContact) {
      return null;
    }

    return ContactMap.toDomain(rawContact);
  }

  async getContacts(): Promise<Contact[]> {
    const rawContacts = await prisma.contact.findMany();

    const domainContacts = rawContacts.map((contact) =>
      ContactMap.toDomain(contact)
    );

    return domainContacts;
  }

  async save(contact: Contact): Promise<void> {
    const contactData = ContactMap.toPersistence(contact);

    await prisma.contact.upsert({
      where: { email: contact.email.value },
      update: contactData,
      create: contactData,
    });

    await this.saveSubscriptions(contact.subscriptions);

    DomainEvents.dispatchEventsForAggregate(contact.id);
  }
}
