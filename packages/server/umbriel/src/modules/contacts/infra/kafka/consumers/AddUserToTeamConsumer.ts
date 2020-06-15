import { convertTextToSlug } from '@server/shared/src/utils/convertTextToSlug';

import { kafka } from '@infra/kafka/client';
import { subscribeContactUseCase } from '@modules/contacts/useCases/contacts/subscribeContact';

interface IMessage {
  user: {
    id: string;
    email: string;
  };
  teams: Array<{
    id: string;
    title: string;
  }>;
}

export class AddUserToTeamConsumer {
  constructor() {
    // this.setupConsumer();
  }

  async setupConsumer(): Promise<void> {
    const consumer = kafka.consumer({
      groupId: 'umbriel',
    });

    await consumer.connect();
    await consumer.subscribe({
      topic: 'umbriel.add-user-to-team',
      fromBeginning: true,
    });

    await consumer.run({
      async eachMessage({ message }) {
        const data: IMessage = JSON.parse(message.value.toString());

        await subscribeContactUseCase.execute({
          email: data.user.email,
          tags: data.teams.map((team) => {
            return {
              title: team.title,
              integrationId: team.id,
            };
          }),
        });
      },
    });

    console.log('Listening to messages!');
  }
}
