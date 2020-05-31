import { Kafka } from 'kafkajs';
import SendEmailService from '../../../modules/email/services/SendEmailService';

const sendEmail = new SendEmailService();
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
    eachMessage: async ({ topic, partition, message }) => {
      sendEmail.execute();

      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
}

main().catch(console.error);
