export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
