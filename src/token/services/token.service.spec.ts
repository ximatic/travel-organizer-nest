import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  MOCK_ACCESS_TOKEN_1,
  MOCK_REFRESH_TOKEN_1,
} from '../../__mocks__/constants/auth.constants';
import { accessTokenModelMock } from '../../__mocks__/schema/access-token.schema.mock';
import { refreshTokenModelMock } from '../../__mocks__/schema/refresh-token.schema.mock';

import { AccessToken } from '../schemas/access-token.schema';
import { RefreshToken } from '../schemas/refresh-token.schema';

import { TokenService } from './token.service';

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

  describe('getAccessToken()', () => {
    it('returning access token works', async () => {
      const mockData = MOCK_ACCESS_TOKEN_1;
      accessTokenModel.findOne.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getAccessToken(MOCK_ACCESS_TOKEN_1.token);

      expect(result).toEqual(mockData);
      expect(accessTokenModel.findOne).toHaveBeenCalled();
    });
  });

  describe('getAccessTokenByUserId()', () => {
    it('returning access token by User ID works', async () => {
      const mockData = MOCK_ACCESS_TOKEN_1;
      accessTokenModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getAccessTokenByUserId(
        MOCK_ACCESS_TOKEN_1.user._id,
      );

      expect(result).toEqual(mockData);
      expect(accessTokenModel.findOne).toHaveBeenCalled();
    });
  });

  describe('createAccessTokenUserId()', () => {
    it('creating access token works', async () => {
      const mockData = MOCK_ACCESS_TOKEN_1;
      accessTokenModel.create.mockReturnValueOnce(mockData as any);

      const result = await service.createAccessTokenUserId(
        MOCK_ACCESS_TOKEN_1.user._id,
        MOCK_ACCESS_TOKEN_1.token,
      );

      expect(result).toEqual(mockData);
      expect(accessTokenModel.create).toHaveBeenCalled();
    });
  });

  describe('deleteAccessTokenByUserId()', () => {
    it('deleting access token by User ID works', async () => {
      const mockData = MOCK_ACCESS_TOKEN_1;
      accessTokenModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteAccessTokenByUserId(
        MOCK_ACCESS_TOKEN_1.user._id,
      );

      expect(result).toEqual(mockData);
      expect(accessTokenModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  describe('deleteAccessToken()', () => {
    it('deleting access token by User ID works', async () => {
      const mockData = MOCK_ACCESS_TOKEN_1;
      accessTokenModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteAccessToken(MOCK_ACCESS_TOKEN_1.token);

      expect(result).toEqual(mockData);
      expect(accessTokenModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  // refresh token

  describe('getRefreshTokenByUserId()', () => {
    it('returning refresh token by User ID works', async () => {
      const mockData = MOCK_REFRESH_TOKEN_1;
      refreshTokenModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.getRefreshTokenByUserId(
        MOCK_REFRESH_TOKEN_1.user._id,
      );

      expect(result).toEqual(mockData);
      expect(refreshTokenModel.findOne).toHaveBeenCalled();
    });
  });

  describe('createRefreshTokenUserId()', () => {
    it('creating refresh token works', async () => {
      const mockData = MOCK_REFRESH_TOKEN_1;
      refreshTokenModel.create.mockReturnValueOnce(mockData as any);

      const result = await service.createRefreshTokenUserId(
        MOCK_REFRESH_TOKEN_1.user._id,
        MOCK_REFRESH_TOKEN_1.token,
      );

      expect(result).toEqual(mockData);
      expect(refreshTokenModel.create).toHaveBeenCalled();
    });
  });

  describe('deleteRefreshTokenByUserId()', () => {
    it('deleting refresh token by User ID works', async () => {
      const mockData = MOCK_REFRESH_TOKEN_1;
      refreshTokenModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteRefreshTokenByUserId(
        MOCK_REFRESH_TOKEN_1.user._id,
      );

      expect(result).toEqual(mockData);
      expect(refreshTokenModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  describe('deleteRefreshToken()', () => {
    it('deleting refresh token by User ID works', async () => {
      const mockData = MOCK_REFRESH_TOKEN_1;
      refreshTokenModel.findOneAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockData),
      } as any);

      const result = await service.deleteRefreshToken(
        MOCK_REFRESH_TOKEN_1.token,
      );

      expect(result).toEqual(mockData);
      expect(refreshTokenModel.findOneAndDelete).toHaveBeenCalled();
    });
  });

  // TODO #1 - add more tests for Access Token
  // TODO #2 - add more tests for User Profile
});
