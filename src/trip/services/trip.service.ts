import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../../user/schemas/user.schema';

import { Trip } from '../schemas/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
  ) {}

  // trip

  async getTrips(): Promise<Trip[]> {
    return this.tripModel.find().select(['-items', '-user', '-__v']).exec();
  }

  async getTrip(id: string): Promise<Trip> {
    return await this.tripModel
      .findOne({ _id: id })
      .select(['-user', '-__v'])
      .exec();
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripModel.create({ ...createTripDto, createdAt: new Date() });
  }

  async updateTrip(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
    return this.tripModel
      .findByIdAndUpdate(
        { _id: id },
        { ...updateTripDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteTrip(id: string): Promise<Trip> {
    return this.tripModel.findByIdAndDelete({ _id: id }).exec();
  }

  // trip - by User ID

  async getTripsByUserId(user: User): Promise<Trip[]> {
    return this.tripModel
      .find({ user: user._id })
      .select(['-items', '-user', '-__v'])
      .exec();
  }

  async getTripByUserId(user: User, id: string): Promise<Trip> {
    return await this.tripModel
      .findOne({ _id: id, user: user._id })
      .select(['-user', '-__v'])
      .exec();
  }

  async createTripByUserId(
    user: User,
    createTripDto: CreateTripDto,
  ): Promise<Trip> {
    return this.tripModel.create({
      ...createTripDto,
      user: user._id,
      createdAt: new Date(),
    });
  }

  async updateTripByUserId(
    user: User,
    id: string,
    updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: id, user: user._id },
        { ...updateTripDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteTripByUserId(user: User, id: string): Promise<Trip> {
    return this.tripModel.findOneAndDelete({ _id: id, user: user._id }).exec();
  }

  // trip item

  async createTripItem(
    tripId: string,
    createTripItemDto: CreateTripItemDto,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: tripId },
        { $push: { items: { ...createTripItemDto, createdAt: new Date() } } },
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
        {
          $set: { 'items.$': { ...updateTripItemDto, updatedAt: new Date() } },
        },
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

  async createTripItemByUserId(
    user: User,
    tripId: string,
    createTripItemDto: CreateTripItemDto,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: tripId, user: user._id },
        {
          $push: {
            items: {
              ...createTripItemDto,
              createdAt: new Date(),
            },
          },
        },
        { new: true },
      )
      .exec();
  }

  async updateTripItemByUserId(
    user: User,
    tripId: string,
    tripItemId: string,
    updateTripItemDto: UpdateTripItemDto,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        {
          _id: tripId,
          user: user._id,
          items: { $elemMatch: { _id: tripItemId } },
        },
        {
          $set: { 'items.$': { ...updateTripItemDto, updatedAt: new Date() } },
        },
        { new: true },
      )
      .exec();
  }

  async deleteTripItemByUserId(
    user: User,
    tripId: string,
    tripItemId: string,
  ): Promise<Trip> {
    return this.tripModel
      .findOneAndUpdate(
        { _id: tripId, user: user._id },
        { $pull: { items: { _id: tripItemId } } },
        { new: true },
      )
      .exec();
  }
}
