import { Kafka, logLevel } from 'kafkajs';

const client = new Kafka({
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  clientId: 'umbriel',
});

export default client;
