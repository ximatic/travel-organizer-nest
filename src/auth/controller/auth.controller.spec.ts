import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../guards/auth.guard';

import { AuthService } from '../service/auth.service';

import { AuthController } from './auth.controller';

const authServiceMock = {
  login: jest.fn(),
  logout: jest.fn(),
  verifyToken: jest.fn(),
  refreshToken: jest.fn(),
  getProfile: jest.fn(),
  signup: jest.fn(),
};

const authGuardMock = {
  canActivate: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO #1 - add more tests
});
