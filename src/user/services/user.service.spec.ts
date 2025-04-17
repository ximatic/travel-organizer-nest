import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MOCK_PASSWORD_1 } from '../../__mocks__/constants/common.constants';
import {
  MOCK_USER_1,
  MOCK_USER_2,
  MOCK_USER_PROFILE_1,
  MOCK_USER_SETTINGS_1,
} from '../../__mocks__/constants/user.constants';
import { MOCK_CREATE_USER_1 } from '../../__mocks__/dto/user.dto';
import { userProfileServiceMock } from '../../__mocks__/services/user-profile.service.mock';
import { userSettingsServiceMock } from '../../__mocks__/services/user-settings.service.mock';
import { userModelMock } from '../../__mocks__/schema/user.schema.mock';

import { UserProfileService } from './user-profile.service';
import { UserSettingsService } from './user-settings.service';

import { User } from '../schemas/user.schema';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
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
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
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
        const mockData = [MOCK_USER_1, MOCK_USER_2];
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
        const mockData = MOCK_USER_1;
        userModel.findOne.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUserById(MOCK_USER_1._id.toString());

        expect(result).toEqual(mockData);
        expect(userModel.findOne).toHaveBeenCalled();
      });
    });

    describe('getUserByEmail()', () => {
      it('returning single user by email works', async () => {
        const mockData = MOCK_USER_1;
        userModel.findOne.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUserByEmail(MOCK_USER_1.email);

        expect(result).toEqual(mockData);
        expect(userModel.findOne).toHaveBeenCalled();
      });
    });

    describe('getUserByEmailAndPassword()', () => {
      it('returning single user by email and password works', async () => {
        const mockData = MOCK_USER_1;
        userModel.findOne.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.getUserByEmailAndPassword(
          MOCK_USER_1.email,
          MOCK_USER_1.password,
        );

        expect(result).toEqual(mockData);
        expect(userModel.findOne).toHaveBeenCalled();
      });
    });

    describe('createUser()', () => {
      it('creating a new user works', async () => {
        const mockData = MOCK_USER_1;
        userModel.create.mockResolvedValueOnce(mockData as any);

        const createUserDto: CreateUserDto = MOCK_CREATE_USER_1;
        const result = await service.createUser(createUserDto);

        expect(result).toEqual(mockData);
        expect(userModel.create).toHaveBeenCalled();
      });
    });

    describe('updateUser()', () => {
      it('updating an existing user works', async () => {
        const mockData = MOCK_USER_1;
        userModel.findByIdAndUpdate.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const updateUserDto: UpdateUserDto = {
          email: MOCK_USER_1.email,
          password: MOCK_USER_1.password,
          passwordRepeat: MOCK_USER_1.password,
        };
        const result = await service.updateUser(
          MOCK_USER_1._id.toString(),
          updateUserDto,
        );

        expect(result).toEqual(mockData);
        expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
      });
    });

    describe('deleteUser()', () => {
      it('deleting an existing user works', async () => {
        const mockData = MOCK_USER_1;
        userModel.findByIdAndDelete.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.deleteUser(MOCK_USER_1._id.toString());

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
          email: MOCK_USER_1.email,
          profile: {
            firstname: MOCK_USER_PROFILE_1.firstname,
            lastname: MOCK_USER_PROFILE_1.lastname,
          },
          settings: {
            language: MOCK_USER_SETTINGS_1.language,
            dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
            timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
            theme: MOCK_USER_SETTINGS_1.theme,
          },
        };
        userProfileService.getUserProfileByUserId.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );
        userSettingsService.getUserSettingsByUserId.mockResolvedValueOnce(
          MOCK_USER_SETTINGS_1,
        );

        const result = await service.getUserInfo(MOCK_USER_1);

        expect(result).toEqual(expectedResult);
        expect(userProfileService.getUserProfileByUserId).toHaveBeenCalledWith(
          MOCK_USER_1._id,
        );
        expect(
          userSettingsService.getUserSettingsByUserId,
        ).toHaveBeenCalledWith(MOCK_USER_1._id);
      });
    });
  });

  // user data
  describe('user data', () => {
    describe('updateUserData()', () => {
      it('updating user data without email works', async () => {
        const updateUserSpy = jest.spyOn(service, 'updateUser');
        const mockData = {
          profile: {
            firstname: MOCK_USER_PROFILE_1.firstname,
            lastname: MOCK_USER_PROFILE_1.lastname,
          },
        };
        const expectedData = {
          email: MOCK_USER_1.email,
          profile: {
            firstname: MOCK_USER_PROFILE_1.firstname,
            lastname: MOCK_USER_PROFILE_1.lastname,
          },
        };
        userProfileService.updateUserProfileByUserId.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );

        const result = await service.updateUserData(MOCK_USER_1, mockData);

        expect(result).toEqual(expectedData);
        expect(updateUserSpy).toHaveBeenCalledTimes(0);
      });

      it('updating user data with profile works', async () => {
        const mockData = {
          email: MOCK_USER_1.email,
          profile: {
            firstname: MOCK_USER_PROFILE_1.firstname,
            lastname: MOCK_USER_PROFILE_1.lastname,
          },
        };
        const expectedData = {
          email: MOCK_USER_1.email,
          profile: {
            firstname: MOCK_USER_PROFILE_1.firstname,
            lastname: MOCK_USER_PROFILE_1.lastname,
          },
        };
        userModel.findByIdAndUpdate.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(MOCK_USER_1),
        } as any);
        userProfileService.updateUserProfileByUserId.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );

        const result = await service.updateUserData(MOCK_USER_1, mockData);

        expect(result).toEqual(expectedData);
        expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
        expect(
          userProfileService.updateUserProfileByUserId,
        ).toHaveBeenCalledWith(MOCK_USER_1._id, mockData.profile);
      });

      it('updating user data without profile works', async () => {
        const mockData = {
          email: MOCK_USER_1.email,
        };
        const expectedData = {
          email: MOCK_USER_1.email,
          profile: {
            firstname: MOCK_USER_PROFILE_1.firstname,
            lastname: MOCK_USER_PROFILE_1.lastname,
          },
        };
        userModel.findByIdAndUpdate.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(MOCK_USER_1),
        } as any);
        userProfileService.getUserProfileByUserId.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );

        const result = await service.updateUserData(MOCK_USER_1, mockData);

        expect(result).toEqual(expectedData);
        expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
        expect(userProfileService.getUserProfileByUserId).toHaveBeenCalledWith(
          MOCK_USER_1._id,
        );
      });
    });
  });

  // user password

  describe('user password', () => {
    describe('updateUserPassword()', () => {
      it('updating an existing user password works', async () => {
        const mockData = MOCK_USER_1;
        userModel.findByIdAndUpdate.mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(mockData),
        } as any);

        const result = await service.updateUserPassword(
          MOCK_USER_1._id.toString(),
          MOCK_PASSWORD_1,
        );

        expect(result).toEqual(mockData);
        expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
      });
    });
  });

  // user profile

  describe('user profile', () => {
    describe('getUserProfile()', () => {
      it('returning user profile works', async () => {
        const expectedResult = {
          firstname: MOCK_USER_PROFILE_1.firstname,
          lastname: MOCK_USER_PROFILE_1.lastname,
        };
        userProfileService.getUserProfileByUserId.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );

        const result = await service.getUserProfile(MOCK_USER_1);

        expect(result).toEqual(expectedResult);
        expect(userProfileService.getUserProfileByUserId).toHaveBeenCalledWith(
          MOCK_USER_1._id,
        );
      });
    });

    describe('createUserProfile()', () => {
      it('creating a new user profile works', async () => {
        const mockData = {
          firstname: MOCK_USER_PROFILE_1.firstname,
          lastname: MOCK_USER_PROFILE_1.lastname,
          user: MOCK_USER_1._id,
        };
        const expectedResult = {
          firstname: MOCK_USER_PROFILE_1.firstname,
          lastname: MOCK_USER_PROFILE_1.lastname,
        };
        userProfileService.createUserProfile.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );

        const result = await service.createUserProfile(mockData);

        expect(result).toEqual(expectedResult);
        expect(userProfileService.createUserProfile).toHaveBeenCalledWith(
          mockData,
        );
      });
    });

    describe('updateUserProfile()', () => {
      it('updating an existing user profile works', async () => {
        const expectedResult = {
          firstname: MOCK_USER_PROFILE_1.firstname,
          lastname: MOCK_USER_PROFILE_1.lastname,
        };
        userProfileService.updateUserProfileByUserId.mockResolvedValueOnce(
          MOCK_USER_PROFILE_1,
        );

        const result = await service.updateUserProfile(
          MOCK_USER_1,
          MOCK_USER_PROFILE_1,
        );

        expect(result).toEqual(expectedResult);
        expect(
          userProfileService.updateUserProfileByUserId,
        ).toHaveBeenCalledWith(MOCK_USER_1._id, MOCK_USER_PROFILE_1);
      });
    });
  });

  // user settings

  describe('user settings', () => {
    describe('getUserSettings()', () => {
      it('returning user settings works', async () => {
        const expectedResult = {
          language: MOCK_USER_SETTINGS_1.language,
          dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
          timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
          theme: MOCK_USER_SETTINGS_1.theme,
        };
        userSettingsService.getUserSettingsByUserId.mockResolvedValueOnce(
          MOCK_USER_SETTINGS_1,
        );

        const result = await service.getUserSettings(MOCK_USER_1);

        expect(result).toEqual(expectedResult);
        expect(
          userSettingsService.getUserSettingsByUserId,
        ).toHaveBeenCalledWith(MOCK_USER_1._id);
      });
    });

    describe('createUserSettings()', () => {
      it('creating a new user settings works', async () => {
        const mockData = { ...MOCK_USER_SETTINGS_1, user: MOCK_USER_1._id };
        const expectedResult = {
          language: MOCK_USER_SETTINGS_1.language,
          dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
          timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
          theme: MOCK_USER_SETTINGS_1.theme,
        };
        userSettingsService.createUserSettings.mockResolvedValueOnce(
          MOCK_USER_SETTINGS_1,
        );

        const result = await service.createUserSettings(mockData);

        expect(result).toEqual(expectedResult);
        expect(userSettingsService.createUserSettings).toHaveBeenCalledWith(
          mockData,
        );
      });
    });

    describe('updateUserSettings()', () => {
      it('updating an existing user settings works', async () => {
        const expectedResult = {
          language: MOCK_USER_SETTINGS_1.language,
          dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
          timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
          theme: MOCK_USER_SETTINGS_1.theme,
        };
        userSettingsService.updateUserSettingsByUserId.mockResolvedValueOnce(
          MOCK_USER_SETTINGS_1,
        );

        const result = await service.updateUserSettings(
          MOCK_USER_1,
          MOCK_USER_SETTINGS_1,
        );

        expect(result).toEqual(expectedResult);
        expect(
          userSettingsService.updateUserSettingsByUserId,
        ).toHaveBeenCalledWith(MOCK_USER_1._id, MOCK_USER_SETTINGS_1);
      });
    });
  });
});
