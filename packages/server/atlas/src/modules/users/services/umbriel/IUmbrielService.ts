import Team from '@modules/users/domain/Team';
import User from '@modules/users/domain/User';

export default interface IUmbrielService {
  addUserToTeam(user: User, team: Team): Promise<void>;
}
