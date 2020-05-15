import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import auth from '../../../config/auth';

const server = express();

server.post('/sessions', async (request, response) => {
  const userId = 'user-id';

  const privateKey = await fs.promises.readFile(auth.privateKeyPath);

  const token = jwt.sign({}, privateKey, {
    algorithm: 'RS256',
    subject: userId,
  });

  return response.json({
    token,
  });
});

server.listen(3333);
