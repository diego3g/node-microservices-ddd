import { IUseCase } from '@server/shared/src/core/domain/UseCase';
import * as GenericAppError from '@server/shared/src/core/logic/AppError';
import {
  Result,
  failure,
  Either,
  success,
} from '@server/shared/src/core/logic/Result';

import { Contact } from '@modules/contacts/domain/Contact';
import { ContactEmail } from '@modules/contacts/domain/ContactEmail';
import { Tag } from '@modules/contacts/domain/Tag';
import { TagSlug } from '@modules/contacts/domain/TagSlug';
import { IContactRepo } from '@modules/contacts/repositories/IContactRepo';
import { ITagRepo } from '@modules/contacts/repositories/ITagRepo';

import { ISubscribeContactRequestDTO } from './SubscribeContactDTO';
import * as SubscribeContactErrors from './SubscribeContactErrors';

type Response = Either<GenericAppError.UnexpectedError, Result<void>>;

export class SubscribeContactUseCase
  implements IUseCase<ISubscribeContactRequestDTO, Promise<Response>> {
  private contactRepo: IContactRepo;

  private tagRepo: ITagRepo;

  constructor(contactRepo: IContactRepo, tagRepo: ITagRepo) {
    this.contactRepo = contactRepo;
    this.tagRepo = tagRepo;
  }

  async execute(request: ISubscribeContactRequestDTO): Promise<Response> {
    try {
      const contactAlreadyExists = await this.contactRepo.findByEmail(
        request.email
      );

      if (contactAlreadyExists) {
        return failure(
          new SubscribeContactErrors.ContactAlreadyExists(request.email)
        );
      }

      const tagsOrError: Result<Tag>[] = request.tags.map((tag) => {
        const slugOrError = TagSlug.createFromIntegration(
          tag.title,
          tag.integrationId
        );

        if (slugOrError.isFailure) {
          return Result.fail(slugOrError.error);
        }

        return Tag.create({
          title: tag.title,
          slug: slugOrError.getValue(),
        });
      });

      const tagsResult = Result.combine(tagsOrError);

      if (tagsResult.isFailure) {
        return failure(Result.fail(tagsResult.error));
      }

      const tags = tagsOrError.map((tag) => tag.getValue());
      const tagsSlugs = tags.map((tag) => tag.slug);

      const existentTags = await this.tagRepo.findTagBySlugBulk(tagsSlugs);

      const nonExistentTags = tags.filter((tag) => {
        return !existentTags.find((existentTag) => {
          return existentTag.slug.value === tag.slug.value;
        });
      });

      await this.tagRepo.saveBulk(nonExistentTags);

      const emailOrError = ContactEmail.create(request.email);

      if (emailOrError.isFailure) {
        return failure(Result.fail(emailOrError.error));
      }

      const contactOrError = Contact.create({
        email: emailOrError.getValue(),
      });

      if (contactOrError.isFailure) {
        return failure(Result.fail(contactOrError.error));
      }

      const contact = contactOrError.getValue();

      const subscribedTags = [...existentTags, ...nonExistentTags];

      const subscribedTagsOrErrors = subscribedTags.map((tag) => {
        return contact.addSubscription(tag);
      });

      const subscriptionResult = Result.combine(subscribedTagsOrErrors);

      if (subscriptionResult.isFailure) {
        return failure(Result.fail(subscriptionResult.error));
      }

      await this.contactRepo.save(contact);

      return success(Result.ok());
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }
  }
}
