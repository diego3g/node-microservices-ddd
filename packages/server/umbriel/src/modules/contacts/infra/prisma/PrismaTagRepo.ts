import { DomainEvents } from '@server/shared/src/core/domain/events/DomainEvents';

import { prisma } from '@infra/prisma/client';
import { Tag } from '@modules/contacts/domain/Tag';
import { TagSlug } from '@modules/contacts/domain/TagSlug';
import { TagMap } from '@modules/contacts/mappers/TagMap';
import { ITagRepo } from '@modules/contacts/repositories/ITagRepo';

export class PrismaTagRepo implements ITagRepo {
  async findTagBySlug(slug: TagSlug): Promise<Tag> {
    const tag = await prisma.tag.findOne({
      where: {
        slug: slug.value,
      },
    });

    if (!tag) {
      return null;
    }

    return TagMap.toDomain(tag);
  }

  async findTagBySlugBulk(slugs: TagSlug[]): Promise<Tag[]> {
    const tags = await Promise.all(
      slugs.map((slug) => this.findTagBySlug(slug))
    );

    return tags.filter((tag) => !!tag === true);
  }

  async save(tag: Tag): Promise<void> {
    const tagData = TagMap.toPersistence(tag);

    await prisma.tag.upsert({
      where: { id: tagData.id },
      update: tagData,
      create: tagData,
    });

    DomainEvents.dispatchEventsForAggregate(tag.id);
  }

  async saveBulk(tags: Tag[]): Promise<void> {
    await Promise.all(tags.map((tag) => this.save(tag)));
  }
}
