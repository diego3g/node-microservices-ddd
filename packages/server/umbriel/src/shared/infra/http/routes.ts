import express from 'express';

const router = express.Router();

router.use('/', (request, response) => {
  return response.json({ hello: 'world' });
});

export default router;
