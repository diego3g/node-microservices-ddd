import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';
import Guard from '@server/shared/src/core/logic/Guard';
import Result from '@server/shared/src/core/logic/Result';

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
    return jwt.sign(payload, authConfig.secret, {
      subject: props.sub,
      expiresIn: authConfig.tokenExpiryTimeInSeconds,
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
