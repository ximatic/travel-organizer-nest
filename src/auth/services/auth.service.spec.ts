import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import {
  MOCK_EMAIL_1,
  MOCK_FIRSTNAME_1,
  MOCK_LASTNAME_1,
  MOCK_PASSWORD_1,
  MOCK_PASSWORD_2,
} from '../../__mocks__/constants/common.constants';
import { MOCK_ACCESS_TOKEN_1 } from '../../__mocks__/constants/auth.constants';
import {
  MOCK_USER_1,
  MOCK_USER_PROFILE_1,
  MOCK_USER_SETTINGS_1,
} from '../../__mocks__/constants/user.constants';

import { jwtServiceMock } from '../../__mocks__/services/jwt.service.mock';
import { tokenServiceMock } from '../../__mocks__/services/token.service.mock';
import { userServiceMock } from '../../__mocks__/services/user.service.mock';

import { UserService } from '../../user/services/user.service';
import { TokenService } from '../../token/services/token.service';

import { SignUpDto } from '../dto/sign-up.dto';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  let userService: jest.Mocked<UserService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        { provide: UserService, useValue: userServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    userService = module.get(UserService);
    tokenService = module.get(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    it('login throwns UnauthorizedException when user is not found', async () => {
      userService.getUserByEmail.mockResolvedValueOnce(null);

      let hasThrown = false;
      try {
        await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.getUserByEmail).toHaveBeenCalled();
    });

    it('login throwns UnauthorizedException when passwords do not match', async () => {
      userService.getUserByEmail.mockResolvedValueOnce(MOCK_USER_1);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

      let hasThrown = false;
      try {
        await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.getUserByEmail).toHaveBeenCalled();
    });

    it('login throwns InternalServerErrorException when Access Token can not be created', async () => {
      userService.getUserByEmail.mockResolvedValueOnce(MOCK_USER_1);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      tokenService.createAccessTokenUserId.mockResolvedValueOnce(null);

      let hasThrown = false;
      try {
        await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.getUserByEmail).toHaveBeenCalled();
      expect(tokenService.createAccessTokenUserId).toHaveBeenCalled();
    });

    it('login works', async () => {
      userService.getUserByEmail.mockResolvedValueOnce(MOCK_USER_1);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      tokenService.createAccessTokenUserId.mockResolvedValueOnce(
        MOCK_ACCESS_TOKEN_1,
      );

      const expectedResult = {
        accessToken: MOCK_ACCESS_TOKEN_1.token,
        refreshToken: undefined,
      };

      let hasThrown = false;
      let result;
      try {
        result = await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.getUserByEmail).toHaveBeenCalled();
      expect(tokenService.createAccessTokenUserId).toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('logout works', async () => {
      const mockData = MOCK_ACCESS_TOKEN_1;
      tokenService.deleteAccessToken.mockResolvedValueOnce(mockData);

      const result = await service.logout(MOCK_ACCESS_TOKEN_1);

      expect(result).toEqual(mockData);
      expect(tokenService.deleteAccessToken).toHaveBeenCalled();
    });
  });

  describe('verifyToken()', () => {
    it('veryfing token works', async () => {
      const result = await service.verifyToken(MOCK_ACCESS_TOKEN_1);

      expect(result).toEqual({
        accessToken: MOCK_ACCESS_TOKEN_1.token,
        refreshToken: undefined,
      });
    });
  });

  describe('signup()', () => {
    // it('login throwns UnauthorizedException when user is not found', async () => {
    //   userService.getUserByEmail.mockResolvedValueOnce(null);

    //   let hasThrown = false;
    //   try {
    //     await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
    //   } catch (error: any) {
    //     hasThrown = true;
    //     expect(error).toBeInstanceOf(UnauthorizedException);
    //   }

    //   expect(hasThrown).toBe(true);
    //   expect(userService.getUserByEmail).toHaveBeenCalled();
    // });

    // it('login throwns UnauthorizedException when passwords do not match', async () => {
    //   userService.getUserByEmail.mockResolvedValueOnce(MOCK_USER_1);
    //   jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

    //   let hasThrown = false;
    //   try {
    //     await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
    //   } catch (error: any) {
    //     hasThrown = true;
    //     expect(error).toBeInstanceOf(UnauthorizedException);
    //   }

    //   expect(hasThrown).toBe(true);
    //   expect(userService.getUserByEmail).toHaveBeenCalled();
    // });

    // it('login throwns InternalServerErrorException when Access Token can not be created', async () => {
    //   userService.getUserByEmail.mockResolvedValueOnce(MOCK_USER_1);
    //   jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    //   tokenService.createAccessTokenUserId.mockResolvedValueOnce(null);

    //   let hasThrown = false;
    //   try {
    //     await service.login(MOCK_EMAIL_1, MOCK_PASSWORD_1);
    //   } catch (error: any) {
    //     hasThrown = true;
    //     expect(error).toBeInstanceOf(InternalServerErrorException);
    //   }

    //   expect(hasThrown).toBe(true);
    //   expect(userService.getUserByEmail).toHaveBeenCalled();
    //   expect(tokenService.createAccessTokenUserId).toHaveBeenCalled();
    // });

    it('signup throws InternalServerErrorException when passwords are not the same', async () => {
      const signUpDto: SignUpDto = {
        email: MOCK_EMAIL_1,
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_2,
      };

      let hasThrown = false;
      try {
        await service.signup(signUpDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
    });

    it('signup throws InternalServerErrorException when User can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(null);

      const signUpDto: SignUpDto = {
        email: MOCK_EMAIL_1,
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_1,
      };

      let hasThrown = false;
      try {
        await service.signup(signUpDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
    });

    it('signup throws InternalServerErrorException when User Profile can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(null);

      const signUpDto: SignUpDto = {
        email: MOCK_EMAIL_1,
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_1,
      };

      let hasThrown = false;
      try {
        await service.signup(signUpDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
    });

    it('signup throws InternalServerErrorException when User Settings can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);
      userService.createUserSettings.mockResolvedValueOnce(null);

      const signUpDto: SignUpDto = {
        email: MOCK_EMAIL_1,
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_1,
      };

      let hasThrown = false;
      try {
        await service.signup(signUpDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
      expect(userService.createUserSettings).toHaveBeenCalled();
    });

    it('signup throws InternalServerErrorException when Access Token can not be created', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);
      userService.createUserSettings.mockResolvedValueOnce(
        MOCK_USER_SETTINGS_1,
      );
      tokenService.createAccessTokenUserId.mockResolvedValueOnce(null);

      const signUpDto: SignUpDto = {
        email: MOCK_EMAIL_1,
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_1,
      };

      let hasThrown = false;
      try {
        await service.signup(signUpDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }

      expect(hasThrown).toBe(true);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
      expect(userService.createUserSettings).toHaveBeenCalled();
      expect(tokenService.createAccessTokenUserId).toHaveBeenCalled();
    });

    it('signup works', async () => {
      userService.createUser.mockResolvedValueOnce(MOCK_USER_1);
      userService.createUserProfile.mockResolvedValueOnce(MOCK_USER_PROFILE_1);
      userService.createUserSettings.mockResolvedValueOnce(
        MOCK_USER_SETTINGS_1,
      );
      tokenService.createAccessTokenUserId.mockResolvedValueOnce(
        MOCK_ACCESS_TOKEN_1,
      );

      const expectedResult = {
        accessToken: MOCK_ACCESS_TOKEN_1.token,
        refreshToken: undefined,
      };
      const signUpDto: SignUpDto = {
        email: MOCK_EMAIL_1,
        firstname: MOCK_FIRSTNAME_1,
        lastname: MOCK_LASTNAME_1,
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_1,
      };

      let hasThrown = false;
      let result;
      try {
        result = await service.signup(signUpDto);
      } catch {
        hasThrown = true;
      }

      expect(result).toEqual(expectedResult);

      expect(hasThrown).toBe(false);
      expect(userService.createUser).toHaveBeenCalled();
      expect(userService.createUserProfile).toHaveBeenCalled();
      expect(userService.createUserSettings).toHaveBeenCalled();
      expect(tokenService.createAccessTokenUserId).toHaveBeenCalled();
    });
  });
});
