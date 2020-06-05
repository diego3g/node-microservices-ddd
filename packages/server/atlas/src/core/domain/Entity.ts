import UniqueEntityID from './UniqueEntityID';

export default abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;

  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID();
    this.props = props;
  }
}
