import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/service/users.service';
import { TokenService } from './token.service';

import { AuthService } from './auth.service';

const userServiceMock = {
  getUserByEmail: jest.fn(),
  getUserProfileByUserId: jest.fn(),
  createUser: jest.fn(),
  createUserProfile: jest.fn(),
};

const tokenServiceMock = {
  createAccessTokenUserId: jest.fn(),
  deleteAccessToken: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        { provide: UsersService, useValue: userServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO #1 - add more tests
});
