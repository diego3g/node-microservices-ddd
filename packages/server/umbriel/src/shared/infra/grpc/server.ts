import grpc from 'grpc';
import { Kafka } from 'kafkajs';

import { UsersClient } from '@protos/atlas_grpc_pb';
import { Empty } from '@protos/atlas_pb';

const kafka = new Kafka({
  clientId: '@server/umbriel',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const usersClient = new UsersClient(
  '127.0.0.1:50051',
  grpc.credentials.createInsecure()
);

async function main(): Promise<void> {
  await producer.connect();

  const empty = new Empty();

  usersClient.getUsers(empty, async (err, result) => {
    const users = result.getUsersList();

    await producer.send({
      topic: 'mercury.send-mail',
      messages: [{ value: `Send mail to ${users[0].getEmail()}` }],
    });
  });
}

main().catch(console.error);
