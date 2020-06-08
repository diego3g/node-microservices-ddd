import AggregateRoot from '@core/domain/AggregateRoot';
import UniqueEntityID from '@core/domain/UniqueEntityID';
import Guard from '@core/logic/Guard';
import Result from '@core/logic/Result';

import UserCreatedEvent from './events/UserCreatedEvent';
import UserLoggedInEvent from './events/UserLoggedInEvent';
import UserEmail from './UserEmail';
import UserPassword from './UserPassword';

interface IUserProps {
  name: string;
  email: UserEmail;
  password: UserPassword;
  accessToken?: string;
  lastLogin?: Date;
}

export default class User extends AggregateRoot<IUserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get accessToken() {
    return this.props.accessToken;
  }

  get lastLogin() {
    return this.props.lastLogin;
  }

  public isLoggedIn() {
    return !!this.props.accessToken;
  }

  public setAccessToken(accessToken: string) {
    this.addDomainEvent(new UserLoggedInEvent(this));

    this.props.accessToken = accessToken;
    this.props.lastLogin = new Date();
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
