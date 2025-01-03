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

  it('returning all trips works', async () => {
    const mockedData = [DEFAULT_TRIP_1, DEFAULT_TRIP_2];
    tripsService.getTrips.mockResolvedValueOnce(mockedData);

    const result = await tripsController.getTrips();

    expect(result).toEqual(mockedData);
    expect(tripsService.getTrips).toHaveBeenCalled();
  });

  it('returning trip works', async () => {
    const mockedData = DEFAULT_TRIP_1;
    tripsService.getTrip.mockResolvedValueOnce(mockedData);

    const result = await tripsController.getTrip(DEFAULT_TRIP_1._id.toString());

    expect(result).toEqual(mockedData);
    expect(tripsService.getTrip).toHaveBeenCalled();
  });

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

  it('updating trip works', async () => {
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

  it('deleting trip works', async () => {
    const mockedData = DEFAULT_TRIP_1;
    tripsService.deleteTrip.mockResolvedValueOnce(mockedData);

    const result = await tripsController.deleteTrip(
      DEFAULT_TRIP_1._id.toString(),
    );

    expect(result).toEqual(mockedData);
    expect(tripsService.deleteTrip).toHaveBeenCalled();
  });
});
