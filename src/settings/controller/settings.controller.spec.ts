import { Test, TestingModule } from '@nestjs/testing';

import { SettingsService } from '../service/settings.service';

import { SettingsController } from './settings.controller';

describe('SettingsController', () => {
  let settingsController: SettingsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [SettingsService],
    }).compile();

    settingsController = app.get<SettingsController>(SettingsController);
  });

  it('should be created', () => {
    expect(settingsController).toBeTruthy();
  });
});
