import { BaseController } from '@server/shared/src/core/infra/BaseController';

import { ISubscribeContactRequestDTO } from './SubscribeContactDTO';
import * as SubscribeContactErrors from './SubscribeContactErrors';
import { SubscribeContactUseCase } from './SubscribeContactUseCase';

export class SubscribeContactController extends BaseController {
  private useCase: SubscribeContactUseCase;

  constructor(useCase: SubscribeContactUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    try {
      const { email, tags } = this.request.body;

      const dto: ISubscribeContactRequestDTO = {
        email,
        tags: tags.map((tag: string) => {
          return {
            title: tag,
          };
        }),
      };

      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const error = result.value;

        switch (error.constructor) {
          case SubscribeContactErrors.ContactAlreadyExists:
            return this.conflict(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.created();
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
