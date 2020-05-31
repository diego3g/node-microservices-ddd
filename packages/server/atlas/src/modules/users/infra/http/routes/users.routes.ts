import express from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

const router = express.Router();

router.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

export default router;
