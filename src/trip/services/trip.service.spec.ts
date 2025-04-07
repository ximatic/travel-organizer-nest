import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  MOCK_TRIP_1,
  MOCK_TRIP_2,
  MOCK_TRIP_ITEM_1,
  MOCK_TRIP_ITEM_2,
} from '../../__mocks__/constants/trip.constants';
import { MOCK_USER_1 } from '../../__mocks__/constants/user.constants';
import { tripModelMock } from '../../__mocks__/schema/trip.schema.mock';
import { MockDate } from '../../__mocks__/date.mock';

import { Trip } from '../schemas/trip.schema';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

import { TripService } from './trip.service';

describe('TripService', () => {
  let tripService: TripService;
  let tripModel: jest.Mocked<Model<Trip>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        TripService,
        {
          provide: getModelToken('Trip'),
          useValue: tripModelMock,
        },
      ],
    }).compile();

    tripService = app.get<TripService>(TripService);
    tripModel = app.get(getModelToken('Trip'));
  });

  beforeAll(() => {
    global.Date = MockDate as DateConstructor;
  });

  afterAll(() => {
    global.Date = Date;
  });

  it('should be created', () => {
    expect(tripService).toBeTruthy();
  });

  // trip

  describe('getTrips()', () => {
    it('returning no trips works', async () => {
      const mockData = [];
      tripModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await tripService.getTrips();

      expect(result).toEqual(mockData);
      expect(tripModel.find).toHaveBeenCalled();
    });

    it('returning all trips works', async () => {
      const mockData = [MOCK_TRIP_1, MOCK_TRIP_2];
      tripModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await tripService.getTrips();

      expect(result).toEqual(mockData);
      expect(tripModel.find).toHaveBeenCalled();
    });
  });

  describe('getTrip()', () => {
    it('returning trip with exisiting ID works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.findOne.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const result = await tripService.getTrip(id);

      expect(result).toEqual(mockData);
      expect(tripModel.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('createTrip()', () => {
    it('inserting a new trip works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.create.mockResolvedValueOnce(mockData as any);

      const createTripDto: CreateTripDto = {
        ...MOCK_TRIP_1,
      };
      const result = await tripService.createTrip(createTripDto);

      expect(result).toEqual(mockData);
      expect(tripModel.create).toHaveBeenCalledWith({
        ...createTripDto,
        createdAt: new Date(),
      });
    });
  });

  describe('updateTrip()', () => {
    it('updating an exisiting trip works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...MOCK_TRIP_1,
      };
      const result = await tripService.updateTrip(id, updateTripDto);

      expect(result).toEqual(mockData);
      expect(tripModel.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        { ...updateTripDto, updatedAt: new Date() },
        { new: true },
      );
    });
  });

  describe('deleteTrip()', () => {
    it('deleting a trip works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const result = await tripService.deleteTrip(id);

      expect(result).toEqual(mockData);
      expect(tripModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: id });
    });
  });

  // trip - by User ID

  describe('getTripsByUserId()', () => {
    it('returning no trips works', async () => {
      const mockData = [];
      tripModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await tripService.getTripsByUserId(MOCK_USER_1);

      expect(result).toEqual(mockData);
      expect(tripModel.find).toHaveBeenCalledWith({ user: MOCK_USER_1._id });
    });

    it('returning all trips works', async () => {
      const mockData = [MOCK_TRIP_1, MOCK_TRIP_2];
      tripModel.find.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await tripService.getTripsByUserId(MOCK_USER_1);

      expect(result).toEqual(mockData);
      expect(tripModel.find).toHaveBeenCalledWith({ user: MOCK_USER_1._id });
    });
  });

  describe('getTripByUserId()', () => {
    it('returning trip with exisiting ID works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.findOne.mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const result = await tripService.getTripByUserId(MOCK_USER_1, id);

      expect(result).toEqual(mockData);
      expect(tripModel.findOne).toHaveBeenCalledWith({
        _id: id,
        user: MOCK_USER_1._id,
      });
    });
  });

  describe('createTripByUserId()', () => {
    it('inserting a new trip works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.create.mockResolvedValueOnce(mockData as any);

      const createTripDto: CreateTripDto = {
        ...MOCK_TRIP_1,
      };
      const result = await tripService.createTripByUserId(
        MOCK_USER_1,
        createTripDto,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.create).toHaveBeenCalledWith({
        ...createTripDto,
        user: MOCK_USER_1._id,
        createdAt: new Date(),
      });
    });
  });

  describe('updateTripByUserId()', () => {
    it('updating an exisiting trip works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...MOCK_TRIP_1,
      };
      const result = await tripService.updateTripByUserId(
        MOCK_USER_1,
        id,
        updateTripDto,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id, user: MOCK_USER_1._id },
        { ...updateTripDto, updatedAt: new Date() },
        { new: true },
      );
    });
  });

  describe('deleteTripByUserId()', () => {
    it('deleting a trip works', async () => {
      const mockData = MOCK_TRIP_1;
      tripModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const result = await tripService.deleteTripByUserId(MOCK_USER_1, id);

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: id,
        user: MOCK_USER_1._id,
      });
    });
  });

  // trip item

  describe('createTripItem()', () => {
    it('creating a new trip item works', async () => {
      const mockData = { ...MOCK_TRIP_1, items: [MOCK_TRIP_ITEM_1] };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = {
        ...MOCK_TRIP_ITEM_1,
      };
      const result = await tripService.createTripItem(id, createTripItemDto);

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        { $push: { items: { ...createTripItemDto, createdAt: new Date() } } },
        { new: true },
      );
    });
  });

  describe('updateTripItem()', () => {
    it('updating an exisiting trip item works', async () => {
      const mockData = { ...MOCK_TRIP_1, items: [MOCK_TRIP_ITEM_2] };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_ITEM_2._id.toString();
      const updateTripItemDto: UpdateTripItemDto = {
        ...MOCK_TRIP_ITEM_2,
      };
      const result = await tripService.updateTripItem(
        tripId,
        tripItemId,
        updateTripItemDto,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: tripId, items: { $elemMatch: { _id: tripItemId } } },
        {
          $set: { 'items.$': { ...updateTripItemDto, updatedAt: new Date() } },
        },
        { new: true },
      );
    });
  });

  describe('deleteTripItem()', () => {
    it('deleting a trip item works', async () => {
      const mockData = { ...MOCK_TRIP_1 };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_ITEM_2._id.toString();
      const result = await tripService.deleteTripItem(tripId, tripItemId);

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: tripId },
        { $pull: { items: { _id: tripItemId } } },
        { new: true },
      );
    });
  });

  // trip item - by User ID

  describe('createTripItemByUserId()', () => {
    it('creating a new trip item works', async () => {
      const mockData = { ...MOCK_TRIP_1, items: [MOCK_TRIP_ITEM_1] };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const id = MOCK_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = {
        ...MOCK_TRIP_ITEM_1,
      };
      const result = await tripService.createTripItemByUserId(
        MOCK_USER_1,
        id,
        createTripItemDto,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id, user: MOCK_USER_1._id },
        { $push: { items: { ...createTripItemDto, createdAt: new Date() } } },
        { new: true },
      );
    });
  });

  describe('updateTripItemByUserId()', () => {
    it('updating an exisiting trip item works', async () => {
      const mockData = { ...MOCK_TRIP_1, items: [MOCK_TRIP_ITEM_2] };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_ITEM_2._id.toString();
      const updateTripItemDto: UpdateTripItemDto = {
        ...MOCK_TRIP_ITEM_2,
      };
      const result = await tripService.updateTripItemByUserId(
        MOCK_USER_1,
        tripId,
        tripItemId,
        updateTripItemDto,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: tripId,
          user: MOCK_USER_1._id,
          items: { $elemMatch: { _id: tripItemId } },
        },
        {
          $set: { 'items.$': { ...updateTripItemDto, updatedAt: new Date() } },
        },
        { new: true },
      );
    });
  });

  describe('deleteTripItemByUserId()', () => {
    it('deleting a trip item works', async () => {
      const mockData = { ...MOCK_TRIP_1 };
      tripModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_ITEM_2._id.toString();
      const result = await tripService.deleteTripItemByUserId(
        MOCK_USER_1,
        tripId,
        tripItemId,
      );

      expect(result).toEqual(mockData);
      expect(tripModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: tripId, user: MOCK_USER_1._id },
        { $pull: { items: { _id: tripItemId } } },
        { new: true },
      );
    });
  });
});
