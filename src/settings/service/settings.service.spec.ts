import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  DEFAULT_SETTINGS_0,
  DEFAULT_SETTINGS_1,
  DEFAULT_SETTINGS_2,
} from '../../__mocks__/settings.constants';

import { Settings } from '../schema/settings.schema';

import { CreateSettingsDto } from '../dto/create-settings.dto';
import { UpdateSettingsDto } from '../dto/update-settings.dto';

import { SettingsService } from '../service/settings.service';

const settingsModelMock = {
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('SettingsService', () => {
  let settingsService: SettingsService;
  let settingsModel: jest.Mocked<Model<Settings>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        SettingsService,
        {
          provide: getModelToken('Settings'),
          useValue: settingsModelMock,
        },
      ],
    }).compile();

    settingsService = app.get<SettingsService>(SettingsService);
    settingsModel = app.get(getModelToken('Settings'));
  });

  it('should be created', () => {
    expect(settingsService).toBeTruthy();
  });

  describe('getSettings()', () => {
    it('requesting settings without ID works and returns Default Setting', async () => {
      const createSettingsSpy = jest.spyOn(settingsService, 'createSettings');

      const mockData = DEFAULT_SETTINGS_1;
      settingsModel.create.mockResolvedValueOnce(mockData as any);

      const result = await settingsService.getSettings();

      expect(result).toEqual(mockData);
      expect(createSettingsSpy).toHaveBeenCalled();
      expect(settingsModel.create).toHaveBeenCalled();
    });

    it('requesting settings with ID provided works', async () => {
      const mockData = DEFAULT_SETTINGS_2;
      settingsModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await settingsService.getSettings(
        DEFAULT_SETTINGS_2._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(settingsModel.findOne).toHaveBeenCalled();
    });
  });

  describe('createSettings()', () => {
    it('inserting a new settings works', async () => {
      const mockData = DEFAULT_SETTINGS_1;
      settingsModel.create.mockResolvedValueOnce(mockData as any);

      const createSettingsDto: CreateSettingsDto = {
        ...DEFAULT_SETTINGS_0,
      };
      const result = await settingsService.createSettings(createSettingsDto);

      expect(result).toEqual(mockData);
      expect(settingsModel.create).toHaveBeenCalled();
    });
  });

  describe('updateSettings()', () => {
    it('updating an existing settings works', async () => {
      const mockData = DEFAULT_SETTINGS_1;
      settingsModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const updateSettingsDto: UpdateSettingsDto = {
        ...DEFAULT_SETTINGS_1,
      };
      const result = await settingsService.updateSettings(
        DEFAULT_SETTINGS_1._id.toString(),
        updateSettingsDto,
      );

      expect(result).toEqual(mockData);
      expect(settingsModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteSettings()', () => {
    it('deleting an existing settings works', async () => {
      const mockData = DEFAULT_SETTINGS_1;
      settingsModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await settingsService.deleteSettings(
        DEFAULT_SETTINGS_1._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(settingsModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('resetSettings()', () => {
    it('resetting an existing settings works', async () => {
      const updateSettingsSpy = jest.spyOn(settingsService, 'updateSettings');

      const mockData = DEFAULT_SETTINGS_1;
      settingsModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await settingsService.resetSettings(
        DEFAULT_SETTINGS_2._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(updateSettingsSpy).toHaveBeenCalled();
      expect(settingsModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
});
