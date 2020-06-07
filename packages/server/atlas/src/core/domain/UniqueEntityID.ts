import { uuid } from 'uuidv4';

export default class UniqueEntityID {
  private value: string | number;

  constructor(id?: string | number) {
    this.value = id || uuid();
  }

  equals(id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof UniqueEntityID)) {
      return false;
    }

    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  toValue() {
    return this.value;
  }
}
