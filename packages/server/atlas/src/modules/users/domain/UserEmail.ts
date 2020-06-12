import { ValueObject } from '@server/shared/src/core/domain/ValueObject';
import { Result } from '@server/shared/src/core/logic/Result';

export interface IUserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<IUserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  private static format(email: string) {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<UserEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail('Email address not valid');
    }

    return Result.ok(new UserEmail({ value: this.format(email) }));
  }
}
