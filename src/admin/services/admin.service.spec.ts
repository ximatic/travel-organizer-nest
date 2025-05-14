import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  MOCK_EMAIL_1,
  MOCK_FIRSTNAME_1,
  MOCK_LASTNAME_1,
  MOCK_PASSWORD_1,
  MOCK_ROLE_1,
} from '../../../__mocks__/constants/common.constants';
import {
  MOCK_ADMIN_USER_RESPONSE_1,
  MOCK_ADMIN_USER_RESPONSE_2,
} from '../../../__mocks__/constants/admin.constants';
import {
  MOCK_USER_1,
  MOCK_USER_2,
  MOCK_USER_PROFILE_1,
  MOCK_USER_SETTINGS_1,
} from '../../../__mocks__/constants/user.constants';

import { userServiceMock } from '../../../__mocks__/services/user.service.mock';

import { UserService } from '../../user/services/user.service';

import { CreateAdminUserDto } from '../dto/create-admin-user.dto';

import { AdminService } from './admin.service';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';

describe('AdminService', () => {
  let service: AdminService;

  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceMock },
        AdminService,
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);

    userService = module.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers()', () => {
    it('getting all users works', async () => {
      userService.getUsers.mockResolvedValueOnce([MOCK_USER_1, MOCK_USER_2]);

      const result = await service.getUsers();

      expect(result).toEqual([
        MOCK_ADMIN_USER_RESPONSE_1,
        MOCK_ADMIN_USER_RESPONSE_2,
      ]);
      expect(userService.getUsers).toHaveBeenCalled();
    });
  });

  describe('getUser()', () => {
    it('getting user works', async () => {
      userService.getUserById.mockResolvedValueOnce(MOCK_USER_1);

      const result = await service.getUser(MOCK_USER_1._id.toString());

      expect(result).toEqual(MOCK_ADMIN_USER_RESPONSE_1);
      expect(userService.getUserById).toHaveBeenCalled();
    });
  });

  describe('createUser()', () => {
    let createAdminUserDto: CreateAdminUserDto = {
      email: MOCK_EMAIL_1,
      firstname: MOCK_FIRSTNAME_1,
      lastname: MOCK_LASTNAME_1,
      password: MOCK_PASSWORD_1,
      role: MOCK_ROLE_1,
    };

    it('creating a new user throws InternalServerErrorException when User can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(null);

      let hasThrown = false;
      try {
        await service.createUser(createAdminUserDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
    });

    it('creating a new user throws InternalServerErrorException when User Profile can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(null);

      let hasThrown = false;
      try {
        await service.createUser(createAdminUserDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
    });

    it('creating a new user throws InternalServerErrorException when User Settings can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);
      userService.createUserSettings.mockResolvedValueOnce(null);

      let hasThrown = false;
      try {
        await service.createUser(createAdminUserDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
      expect(userService.createUserSettings).toHaveBeenCalled();
    });

    it('creating a new user (user + profile) works', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);
      userService.createUserSettings.mockResolvedValueOnce(
        MOCK_USER_SETTINGS_1,
      );

      const expectedResult = MOCK_ADMIN_USER_RESPONSE_1;

      let hasThrown = false;
      let result;
      try {
        result = await service.createUser(createAdminUserDto);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
      expect(userService.createUserSettings).toHaveBeenCalled();
    });

    it('creating a new user (user) works', async () => {
      createAdminUserDto = {
        email: MOCK_EMAIL_1,
        firstname: '',
        lastname: '',
        password: MOCK_PASSWORD_1,
        role: MOCK_ROLE_1,
      };

      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);
      userService.createUserSettings.mockResolvedValueOnce(
        MOCK_USER_SETTINGS_1,
      );

      const expectedResult = MOCK_ADMIN_USER_RESPONSE_1;

      let hasThrown = false;
      let result;
      try {
        result = await service.createUser(createAdminUserDto);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalledWith({
        firstname: '',
        lastname: '',
        user: MOCK_USER_1._id,
      });
      expect(userService.createUserSettings).toHaveBeenCalled();
    });
  });

  describe('updateUser()', () => {
    const id = MOCK_USER_1._id.toString();
    let updateAdminUserDto: UpdateAdminUserDto = {
      id,
      email: MOCK_EMAIL_1,
      firstname: MOCK_FIRSTNAME_1,
      lastname: MOCK_LASTNAME_1,
      password: MOCK_PASSWORD_1,
      role: MOCK_ROLE_1,
    };

    it('updating an existing user throws InternalServerErrorException when User does not exist', async () => {
      userService.updateUser.mockResolvedValueOnce(null);

      let hasThrown = false;
      try {
        await service.updateUser(id, updateAdminUserDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.updateUser).toHaveBeenCalled();
    });

    it('updating an exisiting user throws InternalServerErrorException when User Profile can not be updated', async () => {
      userService.updateUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.updateUserProfile.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await service.updateUser(id, updateAdminUserDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.updateUser).toHaveBeenCalled();
      expect(userService.updateUserProfile).toHaveBeenCalled();
    });

    it('updating an exisiting user (user + profile) works', async () => {
      userService.updateUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.updateUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);

      const expectedResult = MOCK_ADMIN_USER_RESPONSE_1;

      let hasThrown = false;
      let result;
      try {
        result = await service.updateUser(id, updateAdminUserDto);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.updateUser).toHaveBeenCalled();
      expect(userService.updateUserProfile).toHaveBeenCalled();
    });

    it('updating an exisiting user (profile) works', async () => {
      updateAdminUserDto = {
        id,
        email: '',
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: '',
      };

      userService.getUserById.mockResolvedValueOnce(MOCK_USER_1);
      userService.updateUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);

      const expectedResult = MOCK_ADMIN_USER_RESPONSE_1;

      let hasThrown = false;
      let result;
      try {
        result = await service.updateUser(id, updateAdminUserDto);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.updateUser).toHaveBeenCalledTimes(0);
      expect(userService.getUserById).toHaveBeenCalled();
      expect(userService.updateUserProfile).toHaveBeenCalled();
    });

    it('updating an exisiting user (no changes) works', async () => {
      updateAdminUserDto = {
        id,
        email: '',
        firstname: '',
        lastname: '',
        password: '',
      };

      userService.getUserById.mockResolvedValueOnce(MOCK_USER_1);

      const expectedResult = MOCK_ADMIN_USER_RESPONSE_1;

      let hasThrown = false;
      let result;
      try {
        result = await service.updateUser(id, updateAdminUserDto);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.updateUser).toHaveBeenCalledTimes(0);
      expect(userService.getUserById).toHaveBeenCalled();
      expect(userService.updateUserProfile).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteUser()', () => {
    it('deleting user works', async () => {
      userService.deleteUser.mockResolvedValueOnce(MOCK_USER_1);

      const expectedResult = MOCK_ADMIN_USER_RESPONSE_1;
      const result = await service.deleteUser(MOCK_USER_1._id.toString());

      expect(result).toEqual(expectedResult);
      expect(userService.deleteUser).toHaveBeenCalled();
    });
  });
});
