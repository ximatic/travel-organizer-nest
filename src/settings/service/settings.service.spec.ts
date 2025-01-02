import { Test, TestingModule } from '@nestjs/testing';

import { SettingsService } from '../service/settings.service';

describe('SettingsService', () => {
  let settingsService: SettingsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [SettingsService],
    }).compile();

    settingsService = app.get<SettingsService>(SettingsService);
  });

  it('should be created', () => {
    expect(settingsService).toBeTruthy();
  });
});
