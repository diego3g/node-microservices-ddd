import express from 'express';

import userRouter from '@modules/users/infra/http/routes';

const router = express.Router();

router.use('/users', userRouter);

export default router;

// import express from 'express';

// import { CompressionTypes } from 'kafkajs';

// import prisma from '@infra/prisma/client';
// import kafka from '@infra/kafka/client';

// const router = express.Router();

// router.get('/users', async (request, response) => {
//   const users = await prisma.user.findMany();

//   return response.json(users);
// });

// router.post('/users', async (request, response) => {
//   const { name, email, password } = request.body;

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password,
//     },
//   });

//   const producer = kafka.producer();

//   await producer.connect();

// const kafkaMessage = {
//   user_id: user.id,
//   email: user.email,
//   team_id: 'xesque-no-bresquedele',
//   team: 'starter',
// };

//   return response.json(user);
// });

// export default router;
