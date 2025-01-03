import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { TripsController } from './controller/trips.controller';
import { TripsService } from './service/trips.service';

import { Trip, TripSchema } from './schema/trip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
