import uuid from 'uuid';

export default class UniqueEntityID {
  private value: string | number;

  constructor(id?: string | number) {
    this.value = id || uuid.v4();
  }

  toString() {
    return String(this.value);
  }

  toValue() {
    return this.value;
  }
}
