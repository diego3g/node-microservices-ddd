import express from 'express';

import { contactsRouter } from '@modules/contacts/infra/http';

const router = express.Router();

router.use('/contacts', contactsRouter);

export { router };
