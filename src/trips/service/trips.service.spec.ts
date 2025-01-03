import { Test, TestingModule } from '@nestjs/testing';

import { TripsService } from '../service/trips.service';

describe('TripsService', () => {
  let tripsService: TripsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [TripsService],
    }).compile();

    tripsService = app.get<TripsService>(TripsService);
  });

  it('should be created', () => {
    expect(tripsService).toBeTruthy();
  });
});
