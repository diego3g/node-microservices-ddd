import express from 'express';

import { createUserController } from '@modules/users/useCases/createUser';
import { loginController } from '@modules/users/useCases/login';

const userRouter = express.Router();

userRouter.post('/', (request, response) =>
  createUserController.execute(request, response)
);

userRouter.post('/login', (request, response) =>
  loginController.execute(request, response)
);

export default userRouter;
