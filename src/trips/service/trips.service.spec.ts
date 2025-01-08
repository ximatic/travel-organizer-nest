import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  DEFAULT_TRIP_1,
  DEFAULT_TRIP_2,
  DEFAULT_TRIP_ITEM_1,
  DEFAULT_TRIP_ITEM_2,
} from '../../__mocks__/trips.constants';

import { Trip } from '../schema/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

import { TripsService } from './trips.service';

const tripModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findOneAndUpdate: jest.fn(),
};

describe('TripsService', () => {
  let tripsService: TripsService;
  let tripModel: jest.Mocked<Model<Trip>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        TripsService,
        {
          provide: getModelToken('Trip'),
          useValue: tripModelMock,
        },
      ],
    }).compile();

    tripsService = app.get<TripsService>(TripsService);
    tripModel = app.get(getModelToken('Trip'));
  });

  it('should be created', () => {
    expect(tripsService).toBeTruthy();
  });

  describe('getTrips()', () => {
    it('returning no trips works', async () => {
      const mockData = [];
      tripModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await tripsService.getTrips();

      expect(result).toEqual(mockData);
      expect(tripModel.find).toHaveBeenCalled();
    });

    it('returning all trips works', async () => {
      const mockData = [DEFAULT_TRIP_1, DEFAULT_TRIP_2];
      tripModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await tripsService.getTrips();

      expect(result).toEqual(mockData);
      expect(tripModel.find).toHaveBeenCalled();
    });
  });

  describe('getTrip()', () => {
    it('returning trip with exisiting ID works', async () => {
      const mockData = DEFAULT_TRIP_1;
      tripModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = DEFAULT_TRIP_1._id.toString();
      const result = await tripsService.getTrip(id);

      expect(result).toEqual(mockData);
      expect(tripModel.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('createTrip()', () => {
    it('inserting a new trip works', async () => {
      const mockData = DEFAULT_TRIP_1;
      tripModel.create.mockResolvedValueOnce(mockData as any);

      const createTripDto: CreateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      const result = await tripsService.createTrip(createTripDto);

      expect(result).toEqual(mockData);
      expect(tripModel.create).toHaveBeenCalledWith(createTripDto);
    });
  });

  describe('updateTrip()', () => {
    it('updating an exisiting trip works', async () => {
      const mockData = DEFAULT_TRIP_1;
      tripModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = DEFAULT_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      const result = await tripsService.updateTrip(id, updateTripDto);

      expect(result).toEqual(mockData);
      expect(tripModel.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        updateTripDto,
        { new: true },
      );
    });
  });

  describe('deleteTrip()', () => {
    it('deleting a trip works', async () => {
      const mockData = DEFAULT_TRIP_1;
      tripModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = DEFAULT_TRIP_1._id.toString();
      const result = await tripsService.deleteTrip(id);

      expect(result).toEqual(mockData);
      expect(tripModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('createTripItem()', () => {
    it('creating a new trip item works', async () => {
      const mockData = { ...DEFAULT_TRIP_1, items: [DEFAULT_TRIP_ITEM_1] };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = DEFAULT_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_1,
      };
      const result = await tripsService.createTripItem(id, createTripItemDto);

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        { $push: { items: createTripItemDto } },
        { new: true },
      );
    });
  });

  describe('updateTripItem()', () => {
    it('updating an exisiting trip item works', async () => {
      const mockData = { ...DEFAULT_TRIP_1, items: [DEFAULT_TRIP_ITEM_2] };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_ITEM_2._id.toString();
      const updateTripItemDto: UpdateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_2,
      };
      const result = await tripsService.updateTripItem(
        tripId,
        tripItemId,
        updateTripItemDto,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: tripId, items: { $elemMatch: { _id: tripItemId } } },
        { $set: { 'items.$': updateTripItemDto } },
        { new: true },
      );
    });
  });

  describe('deleteTripItem()', () => {
    it('deleting a trip item works', async () => {
      const mockData = { ...DEFAULT_TRIP_1 };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_ITEM_2._id.toString();
      const result = await tripsService.deleteTripItem(tripId, tripItemId);

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: tripId },
        { $pull: { items: { _id: tripItemId } } },
        { new: true },
      );
    });
  });
});
