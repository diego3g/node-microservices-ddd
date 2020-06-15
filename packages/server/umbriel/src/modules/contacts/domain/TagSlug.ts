import { ValueObject } from '@server/shared/src/core/domain/ValueObject';
import { Result } from '@server/shared/src/core/logic/Result';

export interface ITagSlugProps {
  value: string;
}

export class TagSlug extends ValueObject<ITagSlugProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ITagSlugProps) {
    super(props);
  }

  private static format(slug: string) {
    return slug
      .toLocaleLowerCase()
      .replace(/[^\w ^-]+/g, '')
      .replace(/ +/g, '-');
  }

  public static createFromIntegration(
    title: string,
    integrationId?: string
  ): Result<TagSlug> {
    const slug = this.format(title).concat(
      integrationId ? `-${integrationId}` : ''
    );

    return Result.ok(new TagSlug({ value: slug }));
  }

  public static create(slug: string): Result<TagSlug> {
    return Result.ok(new TagSlug({ value: this.format(slug) }));
  }
}
