import { User as BaseUser } from '@prisma/client';

export default class User implements BaseUser {
  id: string;

  name: string;

  email: string;

  password: string;
}
