import UniqueEntityID from '../UniqueEntityID';

export default interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
