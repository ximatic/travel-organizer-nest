import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';

import { jwt } from './constants/auth.constants';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    // 3rd party modules
    JwtModule.register({
      global: true,
      secret: jwt.secret,
      signOptions: { expiresIn: '1d' },
    }),
    // internal modules
    TokenModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
