import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenModule } from 'src/token/token.module';
import { UsersModule } from '../users/users.module';

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
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
