import express from 'express';

import { createUserController } from '@modules/users/useCases/createUser';

const userRouter = express.Router();

userRouter.post('/', (request, response) =>
  createUserController.execute(request, response)
);

export default userRouter;
