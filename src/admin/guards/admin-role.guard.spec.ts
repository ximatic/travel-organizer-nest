import {
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMock } from '@golevelup/ts-jest';

import {
  MOCK_ACCESS_TOKEN_1,
  MOCK_ACCESS_TOKEN_2,
} from '../../../__mocks__/constants/auth.constants';

import { AccessToken } from '../../token/schemas/access-token.schema';

import { AdminRoleGuard } from './admin-role.guard';

const getExecutionContextMock = (
  accessToken: AccessToken,
): ExecutionContext => {
  const mockContext = createMock<ExecutionContext>();
  mockContext.switchToHttp().getRequest.mockReturnValue({
    accessToken,
  });

  return mockContext;
};
describe('AdminRoleGuard', () => {
  let guard: AdminRoleGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminRoleGuard],
    }).compile();

    guard = module.get(AdminRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should throw UnauthorizedException when Access Token is not provided', async () => {
    const mockContext = getExecutionContextMock(null);

    let hasThrown = false;
    try {
      await guard.canActivate(mockContext);
    } catch (error: any) {
      hasThrown = true;
      expect(error).toBeInstanceOf(UnauthorizedException);
    }

    expect(hasThrown).toBe(true);
  });

  it('should throw Forbidden HttpException when Access Token user is not an admin', async () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_1);

    let hasThrown = false;
    try {
      await guard.canActivate(mockContext);
    } catch (error: any) {
      hasThrown = true;
      expect(error).toBeInstanceOf(HttpException);
    }

    expect(hasThrown).toBe(true);
  });

  it('should return true when Access Token user is an admin', async () => {
    const mockContext = getExecutionContextMock(MOCK_ACCESS_TOKEN_2);

    expect(await guard.canActivate(mockContext)).toBe(true);
  });
});
