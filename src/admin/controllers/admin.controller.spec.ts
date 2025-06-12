import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { tokenGuardMock } from '../../../__mocks__/guards/token.guard.mock';
import { adminRoleGuardMock } from '../../../__mocks__/guards/admin-role.guard.mock';
import { adminServiceMock } from '../../../__mocks__/services/admin.service.mock';

import {
  MOCK_ADMIN_USER_PROFILE_RESPONSE_1,
  MOCK_ADMIN_USER_RESPONSE_1,
  MOCK_ADMIN_USER_RESPONSE_2,
} from '../../../__mocks__/constants/admin.constants';
import {
  MOCK_USER_1,
  MOCK_USER_PROFILE_1,
} from '../../../__mocks__/constants/user.constants';

import { TokenGuard } from '../../token/guards/token.guard';
import { AdminRoleGuard } from '../guards/admin-role.guard';

import { AdminService } from '../services/admin.service';

import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';

import { AdminController } from './admin.controller';

describe('AdminController', () => {
  let controller: AdminController;
  let service: jest.Mocked<AdminService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: adminServiceMock,
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(tokenGuardMock)
      .overrideGuard(AdminRoleGuard)
      .useValue(adminRoleGuardMock)
      .compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get(AdminService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // user admin

  describe('getUsers()', () => {
    it('getting all users works', async () => {
      const mockData = [MOCK_ADMIN_USER_RESPONSE_1, MOCK_ADMIN_USER_RESPONSE_2];
      service.getUsers.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.getAdminUsers();
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.getUsers).toHaveBeenCalled();
    });

    it('getting all users throws an error', async () => {
      service.getUsers.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await controller.getAdminUsers();
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.getUsers).toHaveBeenCalled();
    });
  });

  describe('getUser()', () => {
    it('getting user works', async () => {
      const mockData = MOCK_ADMIN_USER_PROFILE_RESPONSE_1;
      service.getUser.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.getAdminUser(MOCK_USER_1._id.toString());
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.getUser).toHaveBeenCalled();
    });

    it('getting user throws an error', async () => {
      service.getUser.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await controller.getAdminUser(MOCK_USER_1._id.toString());
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.getUser).toHaveBeenCalled();
    });
  });

  describe('createAdminUser()', () => {
    const createAdminUserDto: CreateAdminUserDto = {
      email: MOCK_USER_1.email,
      password: MOCK_USER_1.password,
      firstname: MOCK_USER_PROFILE_1.firstname,
      lastname: MOCK_USER_PROFILE_1.firstname,
      role: MOCK_USER_1.role,
    };

    it('creating user works', async () => {
      const mockData = MOCK_ADMIN_USER_RESPONSE_1;
      service.createUser.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.createAdminUser(createAdminUserDto);
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.createUser).toHaveBeenCalled();
    });

    it('creating user throws an error', async () => {
      service.createUser.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await controller.createAdminUser(createAdminUserDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.createUser).toHaveBeenCalled();
    });
  });

  describe('updateAdminUser()', () => {
    const updateAdminUserDto: UpdateAdminUserDto = {
      id: MOCK_USER_1._id.toString(),
      email: MOCK_USER_1.email,
      password: MOCK_USER_1.password,
      firstname: MOCK_USER_PROFILE_1.firstname,
      lastname: MOCK_USER_PROFILE_1.firstname,
      role: MOCK_USER_1.role,
    };

    it('updating user works', async () => {
      const mockData = MOCK_ADMIN_USER_RESPONSE_1;
      service.updateUser.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.updateAdminUser(
          MOCK_USER_1._id.toString(),
          updateAdminUserDto,
        );
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.updateUser).toHaveBeenCalled();
    });

    it('updating user throws an error', async () => {
      service.updateUser.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await controller.updateAdminUser(
          MOCK_USER_1._id.toString(),
          updateAdminUserDto,
        );
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.updateUser).toHaveBeenCalled();
    });
  });

  describe('deleteAdminUser()', () => {
    it('deleting user works', async () => {
      const mockData = MOCK_USER_1;
      service.deleteUser.mockResolvedValueOnce({
        id: mockData._id.toString(),
        email: mockData.email,
        role: mockData.role,
      });

      let hasThrown = false;
      try {
        await controller.deleteAdminUser(MOCK_USER_1._id.toString());
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.deleteUser).toHaveBeenCalled();
    });

    it('deleting user throws an error', async () => {
      service.deleteUser.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await controller.deleteAdminUser(MOCK_USER_1._id.toString());
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.deleteUser).toHaveBeenCalled();
    });
  });
});
