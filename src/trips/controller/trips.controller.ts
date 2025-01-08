import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // trip

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
      this.handleTripError(id, error);
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
      this.handleTripError(id, error);
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
      this.handleTripError(id, error);
    }
  }

  // trip item

  @Post(':id/item')
  async createTripItem(
    @Param('id') id: string,
    @Body() createTripItemDto: CreateTripItemDto,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripsService.createTripItem(
          id,
          createTripItemDto,
        );
        if (trip) {
          return trip;
        } else {
          throw new NotFoundException(`Trip with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid trip ID: ${id}`);
      }
    } catch (error: any) {
      this.handleTripError(id, error);
    }
  }

  @Put(':id/item/:itemId')
  async updateTripItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() updateTripItemDto: UpdateTripItemDto,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripsService.updateTripItem(
          id,
          itemId,
          updateTripItemDto,
        );
        if (trip) {
          return trip;
        } else {
          throw new NotFoundException(`Trip with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid trip ID: ${id}`);
      }
    } catch (error: any) {
      this.handleTripError(id, error);
    }
  }

  @Delete(':id/item/:itemId')
  async deleteTripItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripsService.deleteTripItem(id, itemId);
        if (trip) {
          return trip;
        } else {
          throw new NotFoundException(`Trip with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid trip ID: ${id}`);
      }
    } catch (error: any) {
      this.handleTripError(id, error);
    }
  }

  // other

  private handleTripError(id: string, error: any): void {
    if (error instanceof BadRequestException) {
      throw error;
    } else if (error instanceof NotFoundException) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    } else {
      // TODO - think about better solution for logs
      console.error('Trip request error:', error);
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }
}
