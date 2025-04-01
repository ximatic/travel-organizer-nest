import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { TokenModule } from 'src/token/token.module';

import { TripsController } from './controller/trips.controller';
import { TripsService } from './service/trips.service';

import { Trip, TripSchema } from './schema/trip.schema';

@Module({
  imports: [
    // 3rd party modules
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    // internal modules
    AuthModule,
    TokenModule,
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
