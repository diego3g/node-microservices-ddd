import { AggregateRoot } from '@server/shared/src/core/domain/AggregateRoot';
import { UniqueEntityID } from '@server/shared/src/core/domain/UniqueEntityID';
import { Guard } from '@server/shared/src/core/logic/Guard';
import { Result } from '@server/shared/src/core/logic/Result';

import { TagSlug } from './TagSlug';

interface ITagProps {
  title: string;
  slug: TagSlug;
}

export class Tag extends AggregateRoot<ITagProps> {
  get title(): string {
    return this.props.title;
  }

  get slug(): TagSlug {
    return this.props.slug;
  }

  private constructor(props: ITagProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ITagProps, id?: UniqueEntityID): Result<Tag> {
    const guardedProps = [
      { argument: props.title, argumentName: 'title' },
      { argument: props.slug, argumentName: 'slug' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Tag>(guardResult.message);
    }

    const tag = new Tag(props, id);

    return Result.ok<Tag>(tag);
  }
}
