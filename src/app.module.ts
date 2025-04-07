import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { TripModule } from './trip/trip.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 3rd party imports
    MongooseModule.forRoot('mongodb://localhost:27017/travel-organizer'),
    // local imports
    AuthModule,
    TokenModule,
    TripModule,
    UserModule,
  ],
})
export class AppModule {}
