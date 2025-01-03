import { Test, TestingModule } from '@nestjs/testing';

import { TripsService } from '../service/trips.service';

import { TripsController } from './trips.controller';

describe('TripsController', () => {
  let tripsController: TripsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [TripsService],
    }).compile();

    tripsController = app.get<TripsController>(TripsController);
  });

  it('should be created', () => {
    expect(tripsController).toBeTruthy();
  });
});
