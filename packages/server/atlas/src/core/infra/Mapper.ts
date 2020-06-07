export default interface IMapper<T> {
  toPersistence(t: T): any;
  toDomain(raw: any): T;
}
