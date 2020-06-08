import jwt from 'jsonwebtoken';

import Guard from '@core/logic/Guard';
import Result from '@core/logic/Result';

interface IJWTProps {
  sub: string;
}

interface IJWTPayload {
  name: string;
  email: string;
}

export default class JWT {
  public sub: string;

  public token: string;

  private constructor(props: IJWTProps) {
    this.sub = props.sub;
  }

  private static signJwt(props: IJWTProps, payload: IJWTPayload) {
    return jwt.sign(payload, 'secret', {
      subject: props.sub,
      expiresIn: '7d',
    });
  }

  public static create(props: IJWTProps, payload: IJWTPayload): Result<JWT> {
    const guardResult = Guard.againstNullOrUndefined(props.sub, 'sub');

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message);
    }

    const signedToken = this.signJwt(props, payload);
    const jwtToken = new JWT(props);

    jwtToken.token = signedToken;

    return Result.ok(jwtToken);
  }
}
