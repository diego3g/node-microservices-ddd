import { IUseCase } from '@server/shared/src/core/domain/UseCase';
import * as GenericAppError from '@server/shared/src/core/logic/AppError';
import Result, {
  failure,
  Either,
  success,
} from '@server/shared/src/core/logic/Result';

import Team from '@modules/users/domain/Team';
import IUserRepo from '@modules/users/repositories/IUserRepo';
import IUmbrielService from '@modules/users/services/umbriel/IUmbrielService';

import { ISubscribeUserToMailingDTO } from './ISubscribeUserToMailingDTO';
import * as SubcribeUserToMailingErrors from './SubscribeUserToMailingErrors';

type Response = Either<GenericAppError.UnexpectedError, Result<void>>;

export default class LoginUseCase
  implements IUseCase<ISubscribeUserToMailingDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  private umbrielService: IUmbrielService;

  constructor(userRepo: IUserRepo, umbrielService: IUmbrielService) {
    this.userRepo = userRepo;
    this.umbrielService = umbrielService;
  }

  async execute(request: ISubscribeUserToMailingDTO): Promise<Response> {
    try {
      const { userId } = request;

      const user = await this.userRepo.findById(userId);

      const userFound = !!user;

      if (!userFound) {
        return failure(new SubcribeUserToMailingErrors.UserNotFoundError());
      }

      const teamOrError = Team.create({
        title: 'Novo time',
      });

      if (teamOrError.isFailure) {
        return failure(Result.fail(teamOrError.error));
      }

      const team = teamOrError.getValue();

      await this.umbrielService.addUserToTeam(user, team);

      return success(Result.ok());
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }
  }
}
