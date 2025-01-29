import {
  BadRequestException,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Request } from 'express';

import { createMock } from '@golevelup/ts-jest';

import { authGuardMock } from '../../__mocks__/guards/auth.guard.mock';
import { authServiceMock } from '../../__mocks__/services/auth.service.mock';
import {
  DEFAULT_EMAIL_1,
  DEFAULT_PASSWORD_1,
  DEFAULT_PASSWORD_2,
  DEFAULT_FIRSTNAME_1,
  DEFAULT_LASTNAME_1,
} from '../../__mocks__/common.constants';
import {
  DEFAULT_ACCESS_TOKEN_1,
  DEFAULT_AUTH_TOKEN_1,
} from '../../__mocks__/auth.constants';
import {
  DEFAULT_USER_PROFILE_RESPONSE_1,
  DEFAULT_USER_SETTINGS_RESPONSE_1,
} from '../../__mocks__/user.constants';

import { AuthGuard } from '../guards/auth.guard';

import { AuthService } from '../service/auth.service';

import { AuthController } from './auth.controller';

const getExecutionContextMock = (accessToken: string): ExecutionContext => {
  const mockContext = createMock<ExecutionContext>();
  mockContext.switchToHttp().getRequest.mockReturnValue({
    accessToken,
  });

  return mockContext;
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    it('login works', async () => {
      const mockedData = DEFAULT_AUTH_TOKEN_1;
      service.login.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const payload = {
        email: DEFAULT_EMAIL_1,
        password: DEFAULT_PASSWORD_1,
      };
      const result = await controller.login(payload);

      expect(result).toEqual(mockedData);
      expect(service.login).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('logout does not work and throwns an InternalServerErrorException error', async () => {
      service.logout.mockImplementation(() => {
        throw new Error();
      });

      const mockContext = getExecutionContextMock(DEFAULT_ACCESS_TOKEN_1.token);

      let hasThrown = false;
      try {
        await controller.logout(
          mockContext.switchToHttp().getRequest() as Request,
        );
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(service.logout).toHaveBeenCalled();
    });

    it('logout works', async () => {
      service.logout.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(DEFAULT_AUTH_TOKEN_1);
        }),
      );

      const mockContext = getExecutionContextMock(DEFAULT_ACCESS_TOKEN_1.token);

      let hasThrown = false;
      try {
        await controller.logout(
          mockContext.switchToHttp().getRequest() as Request,
        );
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(service.logout).toHaveBeenCalled();
    });
  });

  describe('verify()', () => {
    it('veryfing token works', async () => {
      const mockedData = DEFAULT_AUTH_TOKEN_1;
      service.verifyToken.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const mockContext = getExecutionContextMock(DEFAULT_ACCESS_TOKEN_1.token);

      const result = await controller.verifyToken(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockedData);
      expect(service.verifyToken).toHaveBeenCalled();
    });
  });

  describe('signup()', () => {
    it('signing up does not work if passwords are different', async () => {
      const signupSpy = jest.spyOn(service, 'signup');
      const payload = {
        email: DEFAULT_EMAIL_1,
        password: DEFAULT_PASSWORD_1,
        passwordRepeat: DEFAULT_PASSWORD_2,
        firstname: DEFAULT_FIRSTNAME_1,
        lastname: DEFAULT_LASTNAME_1,
      };

      let hasThrown = false;
      try {
        await controller.signup(payload);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(BadRequestException);
      }

      expect(hasThrown).toBe(true);
      expect(signupSpy).toHaveBeenCalledTimes(0);
    });

    it('signing up works if passwords are the same', async () => {
      const mockedData = DEFAULT_AUTH_TOKEN_1;
      const signupSpy = jest.spyOn(service, 'signup').mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const payload = {
        email: DEFAULT_EMAIL_1,
        password: DEFAULT_PASSWORD_1,
        passwordRepeat: DEFAULT_PASSWORD_1,
        firstname: DEFAULT_FIRSTNAME_1,
        lastname: DEFAULT_LASTNAME_1,
      };

      const result = await controller.signup(payload);

      expect(result).toEqual(mockedData);
      expect(signupSpy).toHaveBeenCalled();
    });
  });

  describe('getUserProfile()', () => {
    it('getting user profile works', async () => {
      const mockedData = DEFAULT_USER_PROFILE_RESPONSE_1;
      service.getUserProfile.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const mockContext = getExecutionContextMock(DEFAULT_ACCESS_TOKEN_1.token);

      const result = await controller.getUserProfile(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockedData);
      expect(service.getUserProfile).toHaveBeenCalled();
    });
  });

  describe('getUserSettings()', () => {
    it('getting user settings works', async () => {
      const mockedData = DEFAULT_USER_SETTINGS_RESPONSE_1;
      service.getUserSettings.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const mockContext = getExecutionContextMock(DEFAULT_ACCESS_TOKEN_1.token);

      const result = await controller.getUserSettings(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockedData);
      expect(service.getUserSettings).toHaveBeenCalled();
    });
  });
});
