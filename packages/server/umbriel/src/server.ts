import express from 'express';
import 'express-async-errors';
import routes from './routes';
import kafka from './kafka';

async function main(): Promise<void> {
  const server = express();

  server.use(express.json());
  server.use(routes);

  server.listen(3334, () => {
    console.log('Umbriel running!');
  });

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
      console.log(JSON.parse(message.value.toString()));
    },
  });
}

main().catch(console.error);
