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
  Req,
  UseGuards,
} from '@nestjs/common';

import { Types } from 'mongoose';

import { TokenGuard } from '../../token/guards/token.guard';

import { TripService } from '../services/trip.service';

import { Trip } from '../schemas/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

@Controller('trip')
@UseGuards(TokenGuard)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // trip

  @Get()
  @UseGuards(TokenGuard)
  async getTrips(@Req() request: Request): Promise<Trip[]> {
    return this.tripService.getTripsByUserId(request['accessToken'].user);
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  async getTrip(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripService.getTripByUserId(
          request['accessToken'].user,
          id,
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

  @Post()
  @UseGuards(TokenGuard)
  async createTrip(
    @Req() request: Request,
    @Body() createTripDto: CreateTripDto,
  ): Promise<Trip> {
    return this.tripService.createTripByUserId(
      request['accessToken'].user,
      createTripDto,
    );
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  async updateTrip(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripService.updateTripByUserId(
          request['accessToken'].user,
          id,
          updateTripDto,
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

  @Delete(':id')
  @UseGuards(TokenGuard)
  async deleteTrip(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripService.deleteTripByUserId(
          request['accessToken'].user,
          id,
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

  // trip item

  @Post(':id/item')
  async createTripItem(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() createTripItemDto: CreateTripItemDto,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripService.createTripItemByUserId(
          request['accessToken'].user,
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
    @Req() request: Request,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() updateTripItemDto: UpdateTripItemDto,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripService.updateTripItemByUserId(
          request['accessToken'].user,
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
    @Req() request: Request,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ): Promise<Trip> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const trip = await this.tripService.deleteTripItemByUserId(
          request['accessToken'].user,
          id,
          itemId,
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
