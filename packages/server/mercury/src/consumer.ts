import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: '@server/mercury',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: '@server/mercury' });

async function main(): Promise<void> {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'mercury.send-mail',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

main()
  .then(() => {
    console.log('Mercury running!');
  })
  .catch(console.error);
