import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  DEFAULT_USER_1,
  DEFAULT_USER_2,
  DEFAULT_USER_PROFILE_1,
  DEFAULT_USER_PROFILE_2,
} from '../../__mocks__/user.constants';

import { User } from '../schema/user.schema';
import { UserProfile } from '../schema/user-profile.schema';

import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

const userModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const userProfileModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let userModel: jest.Mocked<Model<User>>;
  let userProfileModel: jest.Mocked<Model<UserProfile>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
        {
          provide: getModelToken(UserProfile.name),
          useValue: userProfileModelMock,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
    userProfileModel = module.get(getModelToken(UserProfile.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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

  describe('getUser()', () => {
    it('returning single user by id works', async () => {
      const mockData = DEFAULT_USER_1;
      userModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUser(DEFAULT_USER_1._id.toString());

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

  // user profiles

  describe('getUserProfiless()', () => {
    it('returning all user profiless works', async () => {
      const mockData = [DEFAULT_USER_PROFILE_1, DEFAULT_USER_PROFILE_2];
      userProfileModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getUserProfiles();

      expect(result).toEqual(mockData);
      expect(userProfileModel.find).toHaveBeenCalled();
    });
  });

  // TODO #1 - add more advanced tests for User
  // TODO #2 - add tests for User Profile
});
