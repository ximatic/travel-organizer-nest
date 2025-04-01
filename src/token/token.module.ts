import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { jwt } from '../auth/constants/auth.constants';

import { TokenGuard } from './guards/token.guard';

import { TokenService } from './services/token.service';

import { AccessToken, AccessTokenSchema } from './schema/access-token.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schema/refresh-token.schema';

@Module({
  imports: [
    // 3rd party modules
    JwtModule.register({
      global: true,
      secret: jwt.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: AccessToken.name, schema: AccessTokenSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [TokenGuard, TokenService],
  exports: [TokenGuard, TokenService],
})
export class TokenModule {}
