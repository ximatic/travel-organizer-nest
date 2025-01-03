import {
  NotFoundException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Types } from 'mongoose';

import { TripsService } from '../service/trips.service';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';

import { TripsController } from './trips.controller';

const DEFAULT_TRIP_1 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip #1',
  description: 'Test Description #1',
  location: 'Test Location #1',
  type: 'Test Type #1',
  startDate: new Date(),
  endDate: new Date(),
  items: [],
};

const DEFAULT_TRIP_2 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip #2',
  description: 'Test Description #2',
  location: 'Test Location #2',
  type: 'Test Type #2',
  startDate: new Date(),
  endDate: new Date(),
  items: [],
};

const tripsServiceMock = {
  getTrips: jest.fn(),
  getTrip: jest.fn(),
  createTrip: jest.fn(),
  updateTrip: jest.fn(),
  deleteTrip: jest.fn(),
};

describe('TripsController', () => {
  let tripsController: TripsController;
  let tripsService: jest.Mocked<TripsService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: tripsServiceMock,
        },
      ],
    }).compile();

    tripsController = app.get<TripsController>(TripsController);
    tripsService = app.get(TripsService);
  });

  it('should be created', () => {
    expect(tripsController).toBeTruthy();
  });

  describe('getTrips()', () => {
    it('returning no trips works', async () => {
      const mockedData = [];
      tripsService.getTrips.mockResolvedValueOnce(mockedData);

      const result = await tripsController.getTrips();

      expect(result).toEqual(mockedData);
      expect(tripsService.getTrips).toHaveBeenCalled();
    });

    it('returning all trips works', async () => {
      const mockedData = [DEFAULT_TRIP_1, DEFAULT_TRIP_2];
      tripsService.getTrips.mockResolvedValueOnce(mockedData);

      const result = await tripsController.getTrips();

      expect(result).toEqual(mockedData);
      expect(tripsService.getTrips).toHaveBeenCalled();
    });
  });

  describe('getTrip()', () => {
    it('requesting trip with exisiting ID works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.getTrip.mockResolvedValueOnce(mockedData);

      const result = await tripsController.getTrip(
        DEFAULT_TRIP_1._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.getTrip).toHaveBeenCalled();
    });

    it('requesting trip with non-exisiting ID throws NotFoundException error', async () => {
      tripsService.getTrip.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.getTrip(id);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).getStatus()).toBe(
          HttpStatus.NOT_FOUND,
        );
        expect((error as NotFoundException).getResponse()).toEqual({
          error: 'Not Found',
          message: `Trip with ID ${id} not found`,
          statusCode: 404,
        });
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting non-exisiting trip throws NotFoundException error', async () => {
      tripsService.getTrip.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.getTrip(id);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).getStatus()).toBe(
          HttpStatus.NOT_FOUND,
        );
        expect((error as NotFoundException).getResponse()).toEqual({
          error: 'Not Found',
          message: `Trip with ID ${id} not found`,
          statusCode: 404,
        });
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      let hasThrown = false;
      try {
        await tripsController.getTrip(id);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).getStatus()).toBe(
          HttpStatus.BAD_REQUEST,
        );
        expect((error as BadRequestException).getResponse()).toEqual({
          error: 'Bad Request',
          message: `Invalid trip ID: ${id}`,
          statusCode: 400,
        });
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('createTrip()', () => {
    it('creating trip works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.createTrip.mockResolvedValueOnce(mockedData);

      const createTripDto: CreateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      const result = await tripsController.createTrip(createTripDto);

      expect(result).toEqual(mockedData);
      expect(tripsService.createTrip).toHaveBeenCalled();
    });
  });

  describe('updateTrip()', () => {
    it('updating trip with exisiting ID works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.updateTrip.mockResolvedValueOnce(mockedData);

      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      const result = await tripsController.updateTrip(
        DEFAULT_TRIP_1._id.toString(),
        updateTripDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.updateTrip).toHaveBeenCalled();
    });

    it('updating trip with non-exisiting ID throws NotFoundException error', async () => {
      tripsService.getTrip.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      let hasThrown = false;
      try {
        await tripsController.updateTrip(id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).getStatus()).toBe(
          HttpStatus.NOT_FOUND,
        );
        expect((error as NotFoundException).getResponse()).toEqual({
          error: 'Not Found',
          message: `Trip with ID ${id} not found`,
          statusCode: 404,
        });
      }

      expect(hasThrown).toBe(true);
    });

    it('updating non-exisiting trip throws NotFoundException error', async () => {
      tripsService.getTrip.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };

      let hasThrown = false;
      try {
        await tripsController.updateTrip(id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).getStatus()).toBe(
          HttpStatus.NOT_FOUND,
        );
        expect((error as NotFoundException).getResponse()).toEqual({
          error: 'Not Found',
          message: `Trip with ID ${id} not found`,
          statusCode: 404,
        });
      }

      expect(hasThrown).toBe(true);
    });

    it('updating trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };

      let hasThrown = false;
      try {
        await tripsController.updateTrip(id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).getStatus()).toBe(
          HttpStatus.BAD_REQUEST,
        );
        expect((error as BadRequestException).getResponse()).toEqual({
          error: 'Bad Request',
          message: `Invalid trip ID: ${id}`,
          statusCode: 400,
        });
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('deleteTrip()', () => {
    it('deleting trip with exisiting ID works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.deleteTrip.mockResolvedValueOnce(mockedData);

      const result = await tripsController.deleteTrip(
        DEFAULT_TRIP_1._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.deleteTrip).toHaveBeenCalled();
    });

    it('deleting trip with non-exisiting ID throws NotFoundException error', async () => {
      tripsService.getTrip.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.deleteTrip(id);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).getStatus()).toBe(
          HttpStatus.NOT_FOUND,
        );
        expect((error as NotFoundException).getResponse()).toEqual({
          error: 'Not Found',
          message: `Trip with ID ${id} not found`,
          statusCode: 404,
        });
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting non-exisiting trip throws NotFoundException error', async () => {
      tripsService.getTrip.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.deleteTrip(id);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).getStatus()).toBe(
          HttpStatus.NOT_FOUND,
        );
        expect((error as NotFoundException).getResponse()).toEqual({
          error: 'Not Found',
          message: `Trip with ID ${id} not found`,
          statusCode: 404,
        });
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      let hasThrown = false;
      try {
        await tripsController.deleteTrip(id);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(BadRequestException);
        expect((error as BadRequestException).getStatus()).toBe(
          HttpStatus.BAD_REQUEST,
        );
        expect((error as BadRequestException).getResponse()).toEqual({
          error: 'Bad Request',
          message: `Invalid trip ID: ${id}`,
          statusCode: 400,
        });
      }

      expect(hasThrown).toBe(true);
    });
  });
});
