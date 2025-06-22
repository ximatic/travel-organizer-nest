import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { createMock } from '@golevelup/ts-jest';

import { TokenService } from '../services/token.service';

import { MOCK_ACCESS_TOKEN_1 } from '../../../__mocks__/constants/auth.constants';

import { jwt } from '../../auth/constants/auth.constants';

import { TokenGuard } from './token.guard';

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

describe('TokenGuard', () => {
  let guard: TokenGuard;

  let jwtService;
  let tokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        TokenGuard,
      ],
    }).compile();

    guard = module.get<TokenGuard>(TokenGuard);

    jwtService = module.get<JwtService>(JwtService);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate()', () => {
    it('should throw an UnauthorizedException when there is no Authorization in headers', async () => {
      const mockContext = getExecutionContextMock({});

      let hasThrown = false;
      try {
        await guard.canActivate(mockContext);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
    });

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
        authorization: `Bearer ${MOCK_ACCESS_TOKEN_1.token}`,
      });

      let hasThrown = false;
      try {
        await guard.canActivate(mockContext);
      } catch (error: any) {
        hasThrown = true;
        expect(getAccessTokenSpy).toHaveBeenCalledWith(
          MOCK_ACCESS_TOKEN_1.token,
        );
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
    });

    it('should throw an UnauthorizedException when existing but not valid Access Token is passed in Authorization headers', async () => {
      const getAccessTokenSpy = jest
        .spyOn(tokenService, 'getAccessToken')
        .mockReturnValueOnce(MOCK_ACCESS_TOKEN_1);
      const verifyAsyncSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockImplementation(() => {
          throw new Error('User not found');
        });

      const mockContext = getExecutionContextMock({
        authorization: `Bearer ${MOCK_ACCESS_TOKEN_1.token}`,
      });

      let hasThrown = false;
      try {
        await guard.canActivate(mockContext);
      } catch (error: any) {
        hasThrown = true;
        expect(getAccessTokenSpy).toHaveBeenCalledWith(
          MOCK_ACCESS_TOKEN_1.token,
        );
        expect(verifyAsyncSpy).toHaveBeenCalledWith(MOCK_ACCESS_TOKEN_1.token, {
          secret: jwt.secret,
        });
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
    });

    it('should return true if valid Access Token is added in Authorization headers', (done) => {
      const getAccessTokenSpy = jest
        .spyOn(tokenService, 'getAccessToken')
        .mockReturnValueOnce(MOCK_ACCESS_TOKEN_1);
      const verifyAsyncSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockReturnValueOnce({});

      const mockContext = getExecutionContextMock({
        authorization: `Bearer ${MOCK_ACCESS_TOKEN_1.token}`,
      });

      guard.canActivate(mockContext).then((result: any) => {
        expect(result).toBeTruthy();
        expect(getAccessTokenSpy).toHaveBeenCalledWith(
          MOCK_ACCESS_TOKEN_1.token,
        );
        expect(verifyAsyncSpy).toHaveBeenCalledWith(MOCK_ACCESS_TOKEN_1.token, {
          secret: jwt.secret,
        });
        done();
      });
    });
  });
});
