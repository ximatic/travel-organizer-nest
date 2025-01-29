import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  DEFAULT_USER_1,
  DEFAULT_USER_PROFILE_1,
  DEFAULT_USER_PROFILE_2,
} from '../../__mocks__/user.constants';

import { UserProfile } from '../schema/user-profile.schema';

import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

import { UserProfileService } from './user-profile.service';

const userProfileModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

describe('UserProfileService', () => {
  let service: UserProfileService;
  let userProfileModel: jest.Mocked<Model<UserProfile>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(UserProfile.name),
          useValue: userProfileModelMock,
        },
        UserProfileService,
      ],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
    userProfileModel = module.get(getModelToken(UserProfile.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // user profile

  describe('getUserProfiles()', () => {
    it('returning all user profiles works', async () => {
      const mockData = [DEFAULT_USER_PROFILE_1, DEFAULT_USER_PROFILE_2];
      userProfileModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserProfiles();

      expect(result).toEqual(mockData);
      expect(userProfileModel.find).toHaveBeenCalled();
    });
  });

  describe('getUserProfileById()', () => {
    it('returning single user profile by id works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserProfileById(
        DEFAULT_USER_PROFILE_1._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(userProfileModel.findOne).toHaveBeenCalled();
    });
  });

  describe('createUserProfile()', () => {
    it('creating a new user profile works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.create.mockResolvedValueOnce(mockData as any);

      const createUserProfileDto: CreateUserProfileDto = {
        firstname: DEFAULT_USER_PROFILE_1.firstname,
        lastname: DEFAULT_USER_PROFILE_1.lastname,
        user: DEFAULT_USER_1._id,
      };
      const result = await service.createUserProfile(createUserProfileDto);

      expect(result).toEqual(mockData);
      expect(userProfileModel.create).toHaveBeenCalled();
    });
  });

  describe('updateUserProfile()', () => {
    it('updating an existing user profile works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const updateUserProfileDto: UpdateUserProfileDto = {
        firstname: DEFAULT_USER_PROFILE_1.firstname,
        lastname: DEFAULT_USER_PROFILE_1.lastname,
      };
      const result = await service.updateUserProfile(
        DEFAULT_USER_PROFILE_1._id.toString(),
        updateUserProfileDto,
      );

      expect(result).toEqual(mockData);
      expect(userProfileModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteUserProfile()', () => {
    it('deleting an existing user profile works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteUserProfile(
        DEFAULT_USER_PROFILE_1._id.toString(),
      );

      expect(result).toEqual(mockData);
      expect(userProfileModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  // user profile - by User ID

  describe('getUserProfileByUserId()', () => {
    it('returning single user profile by user id works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserProfileByUserId(
        DEFAULT_USER_PROFILE_1.user._id,
      );

      expect(result).toEqual(mockData);
      expect(userProfileModel.find).toHaveBeenCalled();
    });
  });

  describe('updateUserProfileByUserId()', () => {
    it('updating an existing user profile by user id works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.findOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const updateUserProfileDto: UpdateUserProfileDto = {
        firstname: DEFAULT_USER_PROFILE_1.firstname,
        lastname: DEFAULT_USER_PROFILE_1.lastname,
      };
      const result = await service.updateUserProfileByUserId(
        DEFAULT_USER_1._id,
        updateUserProfileDto,
      );

      expect(result).toEqual(mockData);
      expect(userProfileModel.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteUserProfileByUserId()', () => {
    it('deleting an existing user profile by user id works', async () => {
      const mockData = DEFAULT_USER_PROFILE_1;
      userProfileModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteUserProfileByUserId(
        DEFAULT_USER_1._id,
      );

      expect(result).toEqual(mockData);
      expect(userProfileModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  // TODO #1 - add more advanced tests unit tests
});
