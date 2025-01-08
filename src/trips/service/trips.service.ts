import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Trip } from '../schema/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
  ) {}

  // trip

  async getTrips(): Promise<Trip[]> {
    return this.tripModel.find().select('-items').exec();
  }

  async getTrip(id: string): Promise<Trip> {
    return await this.tripModel.findOne({ _id: id }).exec();
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripModel.create(createTripDto);
  }

  async updateTrip(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
    return this.tripModel
      .findByIdAndUpdate({ _id: id }, updateTripDto, { new: true })
      .exec();
  }

  async deleteTrip(id: string): Promise<Trip> {
    return this.tripModel.findByIdAndDelete({ _id: id }).exec();
  }

  // trip item

  async createTripItem(
    tripId: string,
    createTripItemDto: CreateTripItemDto,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: tripId },
        { $push: { items: createTripItemDto } },
        { new: true },
      )
      .exec();
  }

  async updateTripItem(
    tripId: string,
    tripItemId: string,
    updateTripItemDto: UpdateTripItemDto,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: tripId, items: { $elemMatch: { _id: tripItemId } } },
        { $set: { 'items.$': updateTripItemDto } },
        { new: true },
      )
      .exec();
  }

  async deleteTripItem(tripId: string, tripItemId: string): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: tripId },
        { $pull: { items: { _id: tripItemId } } },
        { new: true },
      )
      .exec();
  }
}
