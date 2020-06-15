import { UniqueEntityID } from '@server/shared/src/core/domain/UniqueEntityID';

import { Tag as PersistenceTag } from '.prisma/client';

import { Tag } from '../domain/Tag';
import { TagSlug } from '../domain/TagSlug';

export class TagMap {
  static toDomain(raw: PersistenceTag): Tag {
    const tagSlugOrError = TagSlug.create(raw.slug);

    const tagOrError = Tag.create(
      {
        title: raw.title,
        slug: tagSlugOrError.getValue(),
      },
      new UniqueEntityID(raw.id)
    );

    if (tagOrError.isFailure) {
      console.log(tagOrError.error);
    }

    if (tagOrError.isSuccess) {
      return tagOrError.getValue();
    }

    return null;
  }

  static toPersistence(tag: Tag): PersistenceTag {
    return {
      id: tag.id.toValue(),
      title: tag.title,
      slug: tag.slug.value,
    };
  }
}
