import express from 'express';
import 'express-async-errors';
import routes from './routes';

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3334);
