import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 3rd party imports
    MongooseModule.forRoot('mongodb://localhost:27017/travel-organizer'),
    // local imports
    AuthModule,
    TokenModule,
    TripsModule,
    UsersModule,
  ],
})
export class AppModule {}
