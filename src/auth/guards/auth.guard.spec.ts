import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { createMock } from '@golevelup/ts-jest';

import { TokenService } from '../service/token.service';

import { DEFAULT_ACCESS_TOKEN_1 } from '../../__mocks__/auth.constants';

import { jwt } from '../constants/auth.constants';

import { AuthGuard } from './auth.guard';

const getExecutionContextMock = (headers: any): ExecutionContext => {
  const mockContext = createMock<ExecutionContext>();
  mockContext.switchToHttp().getRequest.mockReturnValue({
    headers,
  });

  return mockContext;
};

const jwtServiceMock = {
  verifyAsync: jest.fn(),
};

const tokenServiceMock = {
  getAccessToken: jest.fn(),
};

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let jwtService;
  let tokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        AuthGuard,
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);

    jwtService = module.get<JwtService>(JwtService);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate()', () => {
    it('should throw an UnauthorizedException when no Access Token is passed in Authorization headers', async () => {
      const mockContext = getExecutionContextMock({
        authorization: ``,
      });

      let hasThrown = false;
      try {
        await guard.canActivate(mockContext);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
    });

    it('should throw an UnauthorizedException when non existing Access Token is passed in Authorization headers', async () => {
      const getAccessTokenSpy = jest
        .spyOn(tokenService, 'getAccessToken')
        .mockReturnValueOnce(null);

      const mockContext = getExecutionContextMock({
        authorization: `Bearer ${DEFAULT_ACCESS_TOKEN_1.token}`,
      });

      let hasThrown = false;
      try {
        await guard.canActivate(mockContext);
      } catch (error: any) {
        hasThrown = true;
        expect(getAccessTokenSpy).toHaveBeenCalledWith(
          DEFAULT_ACCESS_TOKEN_1.token,
        );
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
    });

    it('should throw an UnauthorizedException when existing but not valid Access Token is passed in Authorization headers', async () => {
      const getAccessTokenSpy = jest
        .spyOn(tokenService, 'getAccessToken')
        .mockReturnValueOnce(DEFAULT_ACCESS_TOKEN_1);
      const verifyAsyncSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockImplementation(() => {
          throw new Error('User not found');
        });

      const mockContext = getExecutionContextMock({
        authorization: `Bearer ${DEFAULT_ACCESS_TOKEN_1.token}`,
      });

      let hasThrown = false;
      try {
        await guard.canActivate(mockContext);
      } catch (error: any) {
        hasThrown = true;
        expect(getAccessTokenSpy).toHaveBeenCalledWith(
          DEFAULT_ACCESS_TOKEN_1.token,
        );
        expect(verifyAsyncSpy).toHaveBeenCalledWith(
          DEFAULT_ACCESS_TOKEN_1.token,
          {
            secret: jwt.secret,
          },
        );
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
    });

    it('should return true if valid Access Token is added in Authorization headers', (done) => {
      const getAccessTokenSpy = jest
        .spyOn(tokenService, 'getAccessToken')
        .mockReturnValueOnce(DEFAULT_ACCESS_TOKEN_1);
      const verifyAsyncSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce({});

      const mockContext = getExecutionContextMock({
        authorization: `Bearer ${DEFAULT_ACCESS_TOKEN_1.token}`,
      });

      guard.canActivate(mockContext).then((result: any) => {
        expect(result).toBeTruthy();
        expect(getAccessTokenSpy).toHaveBeenCalledWith(
          DEFAULT_ACCESS_TOKEN_1.token,
        );
        expect(verifyAsyncSpy).toHaveBeenCalledWith(
          DEFAULT_ACCESS_TOKEN_1.token,
          {
            secret: jwt.secret,
          },
        );
        done();
      });
    });
  });
});
