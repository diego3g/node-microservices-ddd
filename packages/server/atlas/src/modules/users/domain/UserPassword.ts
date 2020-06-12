import bcrypt from 'bcryptjs';

import { ValueObject } from '@server/shared/src/core/domain/ValueObject';
import { Guard } from '@server/shared/src/core/logic/Guard';
import { Result } from '@server/shared/src/core/logic/Result';

interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserPasswordProps) {
    super(props);
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.isAlreadyHashed()) {
      hashed = this.props.value;

      return bcrypt.compare(plainTextPassword, hashed);
    }

    return this.props.value === plainTextPassword;
  }

  public async getHashedValue(): Promise<string> {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }

    return bcrypt.hash(this.props.value, 8);
  }

  public static create({
    value,
    hashed,
  }: IUserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(value, 'password');

    if (!propsResult.succeeded) {
      return Result.fail(propsResult.message);
    }

    const userPassword = new UserPassword({
      value,
      hashed,
    });

    return Result.ok(userPassword);
  }
}
