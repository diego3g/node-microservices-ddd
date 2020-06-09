import { uuid } from 'uuidv4';

export default class UniqueEntityID {
  private value: string;

  constructor(id?: string) {
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

  toString(): string {
    return String(this.value);
  }

  toValue(): string {
    return this.value;
  }
}
