import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Request } from 'express';

import { createMock } from '@golevelup/ts-jest';

import { tokenGuardMock } from '../../__mocks__/guards/token.guard.mock';
import { userServiceMock } from '../../__mocks__/services/user.service.mock';
import { MOCK_ACCESS_TOKEN_1 } from '../../__mocks__/constants/auth.constants';
import {
  MOCK_USER_PROFILE_RESPONSE_1,
  MOCK_USER_SETTINGS_RESPONSE_1,
} from '../../__mocks__/constants/user.constants';

import { TokenGuard } from '../../token/guards/token.guard';

import { UserService } from '../service/user.service';

import { UserController } from './user.controller';

const getExecutionContextMock = (accessToken: string): ExecutionContext => {
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserProfile()', () => {
    it('getting user profile works', async () => {
      const mockedData = MOCK_USER_PROFILE_RESPONSE_1;
      service.getUserProfile.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1.token);

      const result = await controller.getUserProfile(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockedData);
      expect(service.getUserProfile).toHaveBeenCalled();
    });
  });

  describe('getUserSettings()', () => {
    it('getting user settings works', async () => {
      const mockedData = MOCK_USER_SETTINGS_RESPONSE_1;
      service.getUserSettings.mockResolvedValueOnce(
        new Promise((resolve) => {
          resolve(mockedData);
        }),
      );

      const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1.token);

      const result = await controller.getUserSettings(
        mockContext.switchToHttp().getRequest() as Request,
      );

      expect(result).toEqual(mockedData);
      expect(service.getUserSettings).toHaveBeenCalled();
    });
  });
});
