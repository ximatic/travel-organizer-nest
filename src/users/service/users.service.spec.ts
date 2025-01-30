import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  DEFAULT_USER_1,
  DEFAULT_USER_2,
  DEFAULT_USER_PROFILE_1,
  DEFAULT_USER_SETTINGS_1,
} from '../../__mocks__/constants/user.constants';
import { userProfileServiceMock } from '../../__mocks__/services/user-profile.service.mock';
import { userSettingsServiceMock } from '../../__mocks__/services/user-settings.service.mock';
import { userModelMock } from '../../__mocks__/schema/user.schema.mock';

import { UserProfileService } from './user-profile.service';
import { UserSettingsService } from './user-settings.service';

import { User } from '../schema/user.schema';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userProfileService: jest.Mocked<UserProfileService>;
  let userSettingsService: jest.Mocked<UserSettingsService>;
  let userModel: jest.Mocked<Model<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
        {
          provide: UserProfileService,
          useValue: userProfileServiceMock,
        },
        {
          provide: UserSettingsService,
          useValue: userSettingsServiceMock,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userProfileService = module.get(UserProfileService);
    userSettingsService = module.get(UserSettingsService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // user

  describe('users', () => {
    describe('getUsers()', () => {
      it('returning all users works', async () => {
        const mockData = [DEFAULT_USER_1, DEFAULT_USER_2];
        userModel.find.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUsers();

        expect(result).toEqual(mockData);
        expect(userModel.find).toHaveBeenCalled();
      });
    });

    describe('getUserById()', () => {
      it('returning single user by id works', async () => {
        const mockData = DEFAULT_USER_1;
        userModel.findOne.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUserById(DEFAULT_USER_1._id.toString());

        expect(result).toEqual(mockData);
        expect(userModel.findOne).toHaveBeenCalled();
      });
    });

    describe('getUserByEmail()', () => {
      it('returning single user by email works', async () => {
        const mockData = DEFAULT_USER_1;
        userModel.findOne.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUserByEmail(DEFAULT_USER_1.email);

        expect(result).toEqual(mockData);
        expect(userModel.findOne).toHaveBeenCalled();
      });
    });

    describe('getUserByEmailAndPassword()', () => {
      it('returning single user by email and password works', async () => {
        const mockData = DEFAULT_USER_1;
        userModel.findOne.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUserByEmailAndPassword(
          DEFAULT_USER_1.email,
          DEFAULT_USER_1.password,
        );

        expect(result).toEqual(mockData);
        expect(userModel.findOne).toHaveBeenCalled();
      });
    });

    describe('createUser()', () => {
      it('creating a new user works', async () => {
        const mockData = DEFAULT_USER_1;
        userModel.create.mockResolvedValueOnce(mockData as any);

        const createUserDto: CreateUserDto = {
          email: DEFAULT_USER_1.email,
          password: DEFAULT_USER_1.password,
        };
        const result = await service.createUser(createUserDto);

        expect(result).toEqual(mockData);
        expect(userModel.create).toHaveBeenCalled();
      });
    });

    describe('updateUser()', () => {
      it('updating an existing user works', async () => {
        const mockData = DEFAULT_USER_1;
        userModel.findByIdAndUpdate.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const updateUserDto: UpdateUserDto = {
          email: DEFAULT_USER_1.email,
          password: DEFAULT_USER_1.password,
          passwordRepeat: DEFAULT_USER_1.password,
        };
        const result = await service.updateUser(
          DEFAULT_USER_1._id.toString(),
          updateUserDto,
        );

        expect(result).toEqual(mockData);
        expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
      });
    });

    describe('deleteUser()', () => {
      it('deleting an existing user works', async () => {
        const mockData = DEFAULT_USER_1;
        userModel.findByIdAndDelete.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.deleteUser(DEFAULT_USER_1._id.toString());

        expect(result).toEqual(mockData);
        expect(userModel.findByIdAndDelete).toHaveBeenCalled();
      });
    });

    // TODO #1 - add more advanced unit tests
  });

  // user info

  describe('user info', () => {
    describe('getUserInfo()', () => {
      it('returning all user profiles works', async () => {
        const expectedResult = {
          email: DEFAULT_USER_1.email,
          profile: {
            firstname: DEFAULT_USER_PROFILE_1.firstname,
            lastname: DEFAULT_USER_PROFILE_1.lastname,
          },
          settings: {
            language: DEFAULT_USER_SETTINGS_1.language,
            dateFormat: DEFAULT_USER_SETTINGS_1.dateFormat,
            timeFormat: DEFAULT_USER_SETTINGS_1.timeFormat,
            theme: DEFAULT_USER_SETTINGS_1.theme,
          },
        };
        userProfileService.getUserProfileByUserId.mockResolvedValueOnce(
          DEFAULT_USER_PROFILE_1,
        );
        userSettingsService.getUserSettingsByUserId.mockResolvedValueOnce(
          DEFAULT_USER_SETTINGS_1,
        );

        const result = await service.getUserInfo(DEFAULT_USER_1);

        expect(result).toEqual(expectedResult);
        expect(userProfileService.getUserProfileByUserId).toHaveBeenCalledWith(
          DEFAULT_USER_1._id,
        );
        expect(
          userSettingsService.getUserSettingsByUserId,
        ).toHaveBeenCalledWith(DEFAULT_USER_1._id);
      });
    });
  });

  // user profile

  describe('user profile', () => {
    describe('getUserProfiles()', () => {
      it('returning user profile works', async () => {
        const expectedResult = {
          firstname: DEFAULT_USER_PROFILE_1.firstname,
          lastname: DEFAULT_USER_PROFILE_1.lastname,
        };
        userProfileService.getUserProfileByUserId.mockResolvedValueOnce(
          DEFAULT_USER_PROFILE_1,
        );

        const result = await service.getUserProfile(DEFAULT_USER_1);

        expect(result).toEqual(expectedResult);
        expect(userProfileService.getUserProfileByUserId).toHaveBeenCalledWith(
          DEFAULT_USER_1._id,
        );
      });
    });

    // TODO #2 - add tests for createUserProfile and updateUserProfile
  });

  // user settings

  describe('user settings', () => {
    describe('getUserSettings()', () => {
      it('returning user settings works', async () => {
        const expectedResult = {
          language: DEFAULT_USER_SETTINGS_1.language,
          dateFormat: DEFAULT_USER_SETTINGS_1.dateFormat,
          timeFormat: DEFAULT_USER_SETTINGS_1.timeFormat,
          theme: DEFAULT_USER_SETTINGS_1.theme,
        };
        userSettingsService.getUserSettingsByUserId.mockResolvedValueOnce(
          DEFAULT_USER_SETTINGS_1,
        );

        const result = await service.getUserSettings(DEFAULT_USER_1);

        expect(result).toEqual(expectedResult);
        expect(
          userSettingsService.getUserSettingsByUserId,
        ).toHaveBeenCalledWith(DEFAULT_USER_1._id);
      });
    });

    // TODO #3 - add tests for createUserSettings and updateUserSettings
  });
});
