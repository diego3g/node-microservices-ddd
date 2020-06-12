import express from 'express';

import { getContactsController } from '@modules/contacts/useCases/contacts/getContacts';

const contactsRouter = express.Router();

contactsRouter.get('/', (request, response) =>
  getContactsController.execute(request, response)
);

export default contactsRouter;
