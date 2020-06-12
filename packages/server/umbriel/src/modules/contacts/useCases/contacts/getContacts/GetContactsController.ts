import BaseController from '@server/shared/src/core/infra/BaseController';

import ContactMap from '@modules/contacts/mappers/ContactMap';

import GetContactsUseCase from './GetContactsUseCase';

export default class GetContactsController extends BaseController {
  private useCase: GetContactsUseCase;

  constructor(useCase: GetContactsUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    try {
      const result = await this.useCase.execute();

      if (result.isFailure()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        const contacts = result.value.getValue();

        return this.ok({
          contacts: contacts.map((c) => ContactMap.toDTO(c)),
        });
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
