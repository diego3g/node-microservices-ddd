import { AggregateRoot } from '@server/shared/src/core/domain/AggregateRoot';
import { UniqueEntityID } from '@server/shared/src/core/domain/UniqueEntityID';
import { Guard } from '@server/shared/src/core/logic/Guard';
import { Result } from '@server/shared/src/core/logic/Result';

import { UserCreatedEvent } from './events/UserCreatedEvent';
import { UserEmailChangedEvent } from './events/UserEmailChangedEvent';
import { UserLoggedInEvent } from './events/UserLoggedInEvent';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

interface IUserProps {
  name: string;
  email: UserEmail;
  password: UserPassword;
  accessToken?: string;
  lastLogin?: Date;
}

export class User extends AggregateRoot<IUserProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get lastLogin(): Date {
    return this.props.lastLogin;
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken;
  }

  public setAccessToken(accessToken: string): void {
    this.addDomainEvent(new UserLoggedInEvent(this));

    this.props.accessToken = accessToken;
    this.props.lastLogin = new Date();
  }

  public setEmail(email: UserEmail): void {
    this.addDomainEvent(new UserEmailChangedEvent(this, this.props.email));

    this.props.email = email;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: 'password' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    const user = new User(props, id);

    const idWasProvided = !!id;

    if (!idWasProvided) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return Result.ok<User>(user);
  }
}
