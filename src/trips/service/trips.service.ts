import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Trip } from '../schema/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
  ) {}

  async getTrips(): Promise<Trip[]> {
    return this.tripModel.find().exec();
  }

  async getTrip(id: string): Promise<Trip> {
    return await this.tripModel.findOne({ _id: id }).exec();
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripModel.create(createTripDto);
  }

  updateTrip(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
    return this.tripModel
      .findByIdAndUpdate({ _id: id }, updateTripDto, { new: true })
      .exec();
  }

  async deleteTrip(id: string): Promise<Trip> {
    return this.tripModel.findByIdAndDelete({ _id: id }).exec();
  }
}
