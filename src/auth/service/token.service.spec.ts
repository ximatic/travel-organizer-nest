import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  DEFAULT_ACCESS_TOKEN_1,
  DEFAULT_REFRESH_TOKEN_1,
} from '../../__mocks__/auth.constants';

import { AccessToken } from '../schema/access-token.schema';
import { RefreshToken } from '../schema/refresh-token.schema';

import { TokenService } from './token.service';

const accessTokenModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const refreshTokenModelMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('TokenService', () => {
  let service: TokenService;
  let accessTokenModel: jest.Mocked<Model<AccessToken>>;
  let refreshTokenModel: jest.Mocked<Model<RefreshToken>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(AccessToken.name),
          useValue: accessTokenModelMock,
        },
        {
          provide: getModelToken(RefreshToken.name),
          useValue: refreshTokenModelMock,
        },
        TokenService,
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    accessTokenModel = module.get(getModelToken(AccessToken.name));
    refreshTokenModel = module.get(getModelToken(RefreshToken.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // access token

  describe('getAccessTokenByUserId()', () => {
    it('returning access token by User ID works', async () => {
      const mockData = DEFAULT_ACCESS_TOKEN_1;
      accessTokenModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getAccessTokenByUserId(
        DEFAULT_ACCESS_TOKEN_1.user,
      );

      expect(result).toEqual(mockData);
      expect(accessTokenModel.findOne).toHaveBeenCalled();
    });
  });

  // refresh token

  describe('getRefreshTokenByUserId()', () => {
    it('returning refresh token by User ID works', async () => {
      const mockData = DEFAULT_REFRESH_TOKEN_1;
      refreshTokenModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getRefreshTokenByUserId(
        DEFAULT_REFRESH_TOKEN_1.user,
      );

      expect(result).toEqual(mockData);
      expect(refreshTokenModel.findOne).toHaveBeenCalled();
    });
  });

  // TODO #1 - add more tests for Access Token
  // TODO #2 - add more tests for User Profile
});
