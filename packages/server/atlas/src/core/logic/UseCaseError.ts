interface IUseCaseErrorError {
  message: string;
}

export default abstract class UseCaseError implements IUseCaseErrorError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
