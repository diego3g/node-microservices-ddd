import { Tag } from '../domain/Tag';
import { TagSlug } from '../domain/TagSlug';

export interface ITagRepo {
  findTagBySlug(slug: TagSlug): Promise<Tag>;
  findTagBySlugBulk(slugs: TagSlug[]): Promise<Tag[]>;
  save(tag: Tag): Promise<void>;
  saveBulk(tags: Tag[]): Promise<void>;
}
