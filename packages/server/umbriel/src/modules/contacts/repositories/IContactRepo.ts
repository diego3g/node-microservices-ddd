import { Contact } from '../domain/Contact';
import { ContactEmail } from '../domain/ContactEmail';

export interface IContactRepo {
  findByEmail(email: string | ContactEmail): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  save(contact: Contact): Promise<void>;
}
