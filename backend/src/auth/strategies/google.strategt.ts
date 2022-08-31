import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '172952986362-3rqo2vhddj5d9i6m8hetcosdhuo86s83.apps.googleusercontent.com' ||
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        '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' ||
        process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'http://localhost:3001/api/auth/google/callback' ||
        process.env.GOOGLE_CALL_BACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
