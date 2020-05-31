import express from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';

const router = express.Router();

router.use('/users', userRouter);

export default router;
