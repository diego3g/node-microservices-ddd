import express from 'express';

import 'express-async-errors';
import { router } from './routes';

const server = express();

server.use(express.json());
server.use(router);

server.listen(3333, () => {
  console.log('Atlas running!');
});
