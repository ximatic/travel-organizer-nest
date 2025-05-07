import { Module } from '@nestjs/common';

import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';

import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [
    // local imports
    TokenModule,
    UserModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
