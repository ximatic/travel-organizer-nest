import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  MOCK_USER_1,
  MOCK_USER_SETTINGS_1,
  MOCK_USER_SETTINGS_2,
} from '../../__mocks__/constants/user.constants';
import { userSettingsModelMock } from '../../__mocks__/schema/user-settings.schema.mock';

import { UserSettings } from '../schema/user-settings.schema';

import { CreateUserSettingsDto } from '../dto/create-user-settings.dto';
import { UpdateUserSettingsDto } from '../dto/update-user-settings.dto';

import { UserSettingsService } from './user-settings.service';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let userSettingsModel: jest.Mocked<Model<UserSettings>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(UserSettings.name),
          useValue: userSettingsModelMock,
        },
        UserSettingsService,
      ],
    }).compile();

    service = module.get<UserSettingsService>(UserSettingsService);
    userSettingsModel = module.get(getModelToken(UserSettings.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // user settings

  describe('getUserSettings()', () => {
    it('returning all user settings works', async () => {
      const mockData = [MOCK_USER_SETTINGS_1, MOCK_USER_SETTINGS_2];
      userSettingsModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserSettings();

      expect(result).toEqual(mockData);
      expect(userSettingsModel.find).toHaveBeenCalled();
    });
  });

  describe('getUserSettingsById()', () => {
    it('returning single user settings by id works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserSettingsById(
        MOCK_USER_SETTINGS_1._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(userSettingsModel.find).toHaveBeenCalled();
    });
  });

  describe('createUserSettings()', () => {
    it('creating a new user settings works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.create.mockResolvedValueOnce(mockData as any);

      const createUserSettingsDto: CreateUserSettingsDto = {
        language: MOCK_USER_SETTINGS_1.language,
        dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
        timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
        theme: MOCK_USER_SETTINGS_1.theme,
        user: MOCK_USER_1._id,
      };
      const result = await service.createUserSettings(createUserSettingsDto);

      expect(result).toEqual(mockData);
      expect(userSettingsModel.create).toHaveBeenCalled();
    });
  });

  describe('updateUserSettings()', () => {
    it('updating an existing user settings works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const updateUserSettingsDto: UpdateUserSettingsDto = {
        language: MOCK_USER_SETTINGS_1.language,
        dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
        timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
        theme: MOCK_USER_SETTINGS_1.theme,
      };
      const result = await service.updateUserSettings(
        MOCK_USER_SETTINGS_1._id.toString(),
        updateUserSettingsDto,
      );

      expect(result).toEqual(mockData);
      expect(userSettingsModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteUserSettings()', () => {
    it('deleting an existing user settings works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteUserSettings(
        MOCK_USER_SETTINGS_1._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(userSettingsModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  // user settings - by User ID

  describe('getUserSettingsByUserId()', () => {
    it('returning single user settings by user id works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserSettingsByUserId(
        MOCK_USER_SETTINGS_1.user._id,
      );

      expect(result).toEqual(mockData);
      expect(userSettingsModel.find).toHaveBeenCalled();
    });
  });

  describe('updateUserSettingsByUserId()', () => {
    it('updating an existing user settings by user id works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const updateUserSettingsDto: UpdateUserSettingsDto = {
        language: MOCK_USER_SETTINGS_1.language,
        dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
        timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
        theme: MOCK_USER_SETTINGS_1.theme,
      };
      const result = await service.updateUserSettingsByUserId(
        MOCK_USER_1._id,
        updateUserSettingsDto,
      );

      expect(result).toEqual(mockData);
      expect(userSettingsModel.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteUserSettingsByUserId()', () => {
    it('deleting an existing user settings by user id works', async () => {
      const mockData = MOCK_USER_SETTINGS_1;
      userSettingsModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteUserSettingsByUserId(MOCK_USER_1._id);

      expect(result).toEqual(mockData);
      expect(userSettingsModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  // TODO #1 - add more advanced tests unit tests
});
