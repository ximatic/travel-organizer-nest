import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { tokenServiceMock } from '../../__mocks__/services/token.service.mock';
import { userServiceMock } from '../../__mocks__/services/user.service.mock';

import { UserService } from '../../users/service/user.service';
import { TokenService } from '../../token/services/token.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        { provide: UserService, useValue: userServiceMock },
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
