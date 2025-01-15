import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';

import { jwt } from './constants/auth.constants';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

import { TokenService } from './service/token.service';

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
    // internal modules
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
