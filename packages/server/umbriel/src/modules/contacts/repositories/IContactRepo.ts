import Contact from '../domain/Contact';

export default interface IContactRepo {
  save(contact: Contact): Promise<void>;
}
