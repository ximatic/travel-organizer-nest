import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Trip } from '../schema/trip.schema';

import { TripsService } from './trips.service';

const tripModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('TripsService', () => {
  let tripsService: TripsService;
  let model: jest.Mocked<Model<Trip>>;

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
    model = app.get(getModelToken('Trip'));
  });

  it('should be created', () => {
    expect(tripsService).toBeTruthy();
  });
});
