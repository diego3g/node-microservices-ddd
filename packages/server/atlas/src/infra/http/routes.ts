import express from 'express';

import userRouter from '@modules/users/infra/http/routes';

const router = express.Router();

router.use('/users', userRouter);

export { router };
