import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Types } from 'mongoose';

import { TripsService } from '../service/trips.service';

import { Trip } from '../schema/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async getTrips(): Promise<Trip[]> {
    return this.tripsService.getTrips();
  }

  @Get(':id')
  async getTrip(@Param('id') id: string): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripsService.getTrip(id);
        if (trip) {
          return trip;
        } else {
          throw new NotFoundException(`Trip with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid trip ID: ${id}`);
      }
    } catch (error: any) {
      this.handleError(id, error);
    }
  }

  @Post()
  async createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto);
  }

  @Put(':id')
  async updateTrip(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripsService.updateTrip(id, updateTripDto);
        if (trip) {
          return trip;
        } else {
          throw new NotFoundException(`Trip with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid trip ID: ${id}`);
      }
    } catch (error: any) {
      this.handleError(id, error);
    }
  }

  @Delete(':id')
  async deleteTrip(@Param('id') id: string): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripsService.deleteTrip(id);
        if (trip) {
          return trip;
        } else {
          throw new NotFoundException(`Trip with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid trip ID: ${id}`);
      }
    } catch (error: any) {
      this.handleError(id, error);
    }
  }

  private handleError(id: string, error: any): void {
    if (error instanceof BadRequestException) {
      throw error;
    } else {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  }
}
