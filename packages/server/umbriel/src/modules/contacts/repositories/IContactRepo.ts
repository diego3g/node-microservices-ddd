import Contact from '../domain/Contact';

export default interface IContactRepo {
  getContacts(): Promise<Contact[]>;
  save(contact: Contact): Promise<void>;
}
