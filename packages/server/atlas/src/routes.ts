import express from 'express';
import client from 'prisma/client';

const router = express.Router();

router.get('/users', async (request, response) => {
  const users = await client.user.findMany();

  return response.json(users);
});

export default router;
