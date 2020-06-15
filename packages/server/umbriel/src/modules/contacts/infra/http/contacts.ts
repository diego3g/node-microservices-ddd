import express from 'express';

import { getContactsController } from '@modules/contacts/useCases/contacts/getContacts';
import { subscribeContactController } from '@modules/contacts/useCases/contacts/subscribeContact';

const contactsRouter = express.Router();

contactsRouter.get('/', (request, response) =>
  getContactsController.execute(request, response)
);

contactsRouter.post('/', (request, response) =>
  subscribeContactController.execute(request, response)
);

export default contactsRouter;
