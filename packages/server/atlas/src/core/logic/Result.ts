export default class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error: T | string;

  private _value: T;

  constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);

      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this._value;
  }

  errorValue(): T {
    return this.error as T;
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Failure<L, A> | Success<L, A>;

export class Failure<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFailure(): this is Failure<L, A> {
    return true;
  }

  isSuccess(): this is Success<L, A> {
    return false;
  }
}

export class Success<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isFailure(): this is Failure<L, A> {
    return false;
  }

  isSuccess(): this is Success<L, A> {
    return true;
  }
}

export const failure = <L, A>(l: L): Either<L, A> => {
  return new Failure(l);
};

export const success = <L, A>(a: A): Either<L, A> => {
  return new Success<L, A>(a);
};
