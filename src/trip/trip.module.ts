import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from 'src/token/token.module';

import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';

import { Trip, TripSchema } from './schemas/trip.schema';

@Module({
  imports: [
    // 3rd party modules
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    // internal modules
    AuthModule,
    TokenModule,
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
