import kafka from '@infra/kafka/client';
import { subscribeContactUseCase } from '@modules/contacts/useCases/contacts/subscribeContact';

interface IMessage {
  user: {
    id: string;
    email: string;
  };
  team: {
    id: string;
    title: string;
  };
}

export default class AddUserToTeamConsumer {
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

        subscribeContactUseCase.execute({
          email: data.user.email,
        });
      },
    });

    console.log('Listening to messages!');
  }
}
