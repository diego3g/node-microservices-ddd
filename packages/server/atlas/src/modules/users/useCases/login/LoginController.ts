import { BaseController } from '@server/shared/src/core/infra/BaseController';

import { ILoginRequestDTO } from './ILoginDTO';
import * as LoginErrors from './LoginErrors';
import { LoginUseCase } from './LoginUseCase';

export class LoginController extends BaseController {
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    const dto = this.request.body as ILoginRequestDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const error = result.value;

        switch (error.constructor) {
          case LoginErrors.UserNameDoesntExistError:
            return this.notFound(error.errorValue().message);
          case LoginErrors.PasswordDoesntMatchError:
            return this.clientError(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        const loginResponse = result.value.getValue();

        return this.ok(loginResponse);
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
