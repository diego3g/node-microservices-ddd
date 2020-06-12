import client from '@infra/kafka/client';
import { Team } from '@modules/users/domain/Team';
import { User } from '@modules/users/domain/User';

import { IUmbrielService } from '../IUmbrielService';

export class UmbrielService implements IUmbrielService {
  async addUserToTeam(user: User, team: Team): Promise<void> {
    const userWithTeamMessage = {
      user: {
        id: user.id.toValue(),
        email: user.email.value,
      },
      team: {
        id: team.id.toValue(),
        title: team.title,
      },
    };

    await client.producer().send({
      topic: 'umbriel.add-user-to-team',
      messages: [{ value: JSON.stringify(userWithTeamMessage) }],
    });
  }
}
