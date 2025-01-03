import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TripsService } from '../service/trips.service';

import { Trip } from '../model/trip.model';
import { TripDto } from '../model/trip.dto';

export interface TripParam {
  id: string;
}

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  getTrips(): Trip[] {
    return this.tripsService.getTrips();
  }

  @Get(':id')
  getTrip(@Param() params: TripParam): Trip {
    const trip: Trip = this.tripsService.getTrip(params.id);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }

  @Post()
  createTrip(@Body() tripDto: TripDto): Trip {
    return this.tripsService.createTrip(tripDto);
  }

  @Put() // @Put(':id')
  updateTrip(@Body() tripDto: TripDto): Trip {
    const trip: Trip = this.tripsService.updateTrip(tripDto);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }

  @Delete(':id')
  resetTrip(@Param() params: TripParam): Trip {
    const trip: Trip = this.tripsService.deleteTrip(params.id);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }
}
