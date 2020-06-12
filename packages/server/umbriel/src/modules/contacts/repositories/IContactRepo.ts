import { Contact } from '../domain/Contact';

export interface IContactRepo {
  getContacts(): Promise<Contact[]>;
  save(contact: Contact): Promise<void>;
}
