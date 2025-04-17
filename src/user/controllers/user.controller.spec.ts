import {
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Request } from 'express';

import { createMock } from '@golevelup/ts-jest';

import { tokenGuardMock } from '../../__mocks__/guards/token.guard.mock';
import { userServiceMock } from '../../__mocks__/services/user.service.mock';
import { MOCK_ACCESS_TOKEN_1 } from '../../__mocks__/constants/auth.constants';
import {
  MOCK_PASSWORD_1,
  MOCK_PASSWORD_2,
} from '../../__mocks__/constants/common.constants';
import {
  MOCK_USER_1,
  MOCK_USER_DATA_RESPONSE_1,
  MOCK_USER_INFO_RESPONSE_1,
  MOCK_USER_PROFILE_RESPONSE_1,
  MOCK_USER_SETTINGS_RESPONSE_1,
} from '../../__mocks__/constants/user.constants';
import {
  MOCK_UPDATE_USER_PROFILE_1,
  MOCK_UPDATE_USER_SETTINGS_1,
} from '../../__mocks__/dto/user.dto';

import { TokenGuard } from '../../token/guards/token.guard';

import { UserService } from '../services/user.service';

import { AccessToken } from '../../token/schemas/access-token.schema';

import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserDataDto } from '../dto/update-user-data.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UpdateUserSettingsDto } from '../dto/update-user-settings.dto';

import { UserController } from './user.controller';

const getExecutionContextMock = (
  accessToken: string | AccessToken,
): ExecutionContext => {
  const mockContext = createMock<ExecutionContext>();
  mockContext.switchToHttp().getRequest.mockReturnValue({
    accessToken,
  });

  return mockContext;
};

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(tokenGuardMock)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // user

  describe('updateUser()', () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

    const updateUserDto: UpdateUserDto = {
      email: MOCK_USER_1.email,
      password: MOCK_USER_1.password,
      passwordRepeat: MOCK_USER_1.password,
    };

    it('updating user works', async () => {
      const mockData = MOCK_USER_1;
      service.updateUser.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.updateUser(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserDto,
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
        await controller.updateUser(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserDto,
        );
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.updateUser).toHaveBeenCalled();
    });
  });

  // user info

  describe('getUserInfo()', () => {
    it('getting user info works', async () => {
      const mockData = MOCK_USER_INFO_RESPONSE_1;
      service.getUserInfo.mockResolvedValueOnce(mockData);

      const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

      const result = await controller.getUserInfo(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockData);
      expect(service.getUserInfo).toHaveBeenCalled();
    });
  });

  // user data

  describe('updateUserData()', () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

    const updateUserDataDto: UpdateUserDataDto = {
      email: MOCK_USER_1.email,
    };

    it('updating user data works', async () => {
      const mockData = MOCK_USER_DATA_RESPONSE_1;
      service.updateUserData.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.updateUserData(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserDataDto,
        );
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.updateUserData).toHaveBeenCalled();
    });

    it('updating user data throws an error', async () => {
      service.updateUserData.mockImplementationOnce(() => {
        throw new Error();
      });

      let hasThrown = false;
      try {
        await controller.updateUserData(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserDataDto,
        );
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.updateUserData).toHaveBeenCalled();
    });
  });

  // user password

  describe('updateUserPassword()', () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

    it('updating user password works', async () => {
      service.updateUserPassword.mockResolvedValueOnce(null);

      const updateUserPasswordDto: UpdateUserPasswordDto = {
        currentPassword: MOCK_PASSWORD_1,
        password: MOCK_PASSWORD_2,
        passwordRepeat: MOCK_PASSWORD_2,
      };

      let hasThrown = false;
      try {
        await controller.updateUserPassword(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserPasswordDto,
        );
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.updateUserPassword).toHaveBeenCalled();
    });

    it('updating user password throws error when current password is not valid', async () => {
      const updateUserPasswordDto: UpdateUserPasswordDto = {
        currentPassword: MOCK_PASSWORD_2,
        password: MOCK_PASSWORD_2,
        passwordRepeat: MOCK_PASSWORD_2,
      };

      let hasThrown = false;
      try {
        await controller.updateUserPassword(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserPasswordDto,
        );
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
      expect(service.updateUserPassword).toHaveBeenCalledTimes(0);
    });

    it('updating user password throws an error', async () => {
      service.updateUserPassword.mockImplementationOnce(() => {
        throw new Error();
      });

      const updateUserPasswordDto: UpdateUserPasswordDto = {
        currentPassword: MOCK_PASSWORD_1,
        password: MOCK_PASSWORD_2,
        passwordRepeat: MOCK_PASSWORD_2,
      };

      let hasThrown = false;
      try {
        await controller.updateUserPassword(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserPasswordDto,
        );
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.updateUserPassword).toHaveBeenCalled();
    });
  });

  // user profile

  describe('getUserProfile()', () => {
    it('getting user profile works', async () => {
      const mockData = MOCK_USER_PROFILE_RESPONSE_1;
      service.getUserProfile.mockResolvedValueOnce(mockData);

      const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

      const result = await controller.getUserProfile(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockData);
      expect(service.getUserProfile).toHaveBeenCalled();
    });
  });

  describe('updateUserProfile()', () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

    const updateUserProfileDto: UpdateUserProfileDto =
      MOCK_UPDATE_USER_PROFILE_1;

    it('updating user profile works', async () => {
      const mockData = MOCK_USER_PROFILE_RESPONSE_1;
      service.updateUserProfile.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.updateUserProfile(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserProfileDto,
        );
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.updateUserProfile).toHaveBeenCalled();
    });
  });

  // user settings

  describe('getUserSettings()', () => {
    it('getting user settings works', async () => {
      const mockData = MOCK_USER_SETTINGS_RESPONSE_1;
      service.getUserSettings.mockResolvedValueOnce(mockData);

      const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

      const result = await controller.getUserSettings(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockData);
      expect(service.getUserSettings).toHaveBeenCalled();
    });
  });

  describe('updateUserSettings()', () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

    const updateUserSettingsDto: UpdateUserSettingsDto =
      MOCK_UPDATE_USER_SETTINGS_1;

    it('updating user profile works', async () => {
      const mockData = MOCK_USER_SETTINGS_RESPONSE_1;
      service.updateUserSettings.mockResolvedValueOnce(mockData);

      let hasThrown = false;
      try {
        await controller.updateUserSettings(
          mockContext.switchToHttp().getRequest() as Request,
          updateUserSettingsDto,
        );
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.updateUserSettings).toHaveBeenCalled();
    });
  });
});
