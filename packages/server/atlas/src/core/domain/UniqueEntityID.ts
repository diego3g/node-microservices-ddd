import { uuid } from 'uuidv4';

export default class UniqueEntityID {
  private value: string | number;

  constructor(id?: string | number) {
    this.value = id || uuid();
  }

  toString() {
    return String(this.value);
  }

  toValue() {
    return this.value;
  }
}
