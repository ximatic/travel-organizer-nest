import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { AccessToken } from '../schema/access-token.schema';
import { RefreshToken } from '../schema/refresh-token.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(AccessToken.name)
    private readonly accessTokenModel: Model<AccessToken>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  // access token

  async getAccessToken(token: string): Promise<AccessToken> {
    return await this.accessTokenModel
      .findOne({ token })
      .populate('user')
      .exec();
  }

  async getAccessTokenByUserId(userId: Types.ObjectId): Promise<AccessToken> {
    return await this.accessTokenModel.findOne({ user: userId }).exec();
  }

  async createAccessTokenUserId(
    userId: Types.ObjectId,
    token: string,
  ): Promise<AccessToken> {
    return this.accessTokenModel.create({
      user: userId,
      token,
      createdAt: new Date(),
    });
  }

  async deleteAccessTokenByUserId(
    userId: Types.ObjectId,
  ): Promise<AccessToken> {
    // TODO - should be done together with deleteUser
    return this.accessTokenModel.findOneAndDelete({ user: userId }).exec();
  }

  async deleteAccessToken(token: string): Promise<AccessToken> {
    return this.accessTokenModel.findOneAndDelete({ token }).exec();
  }

  // refresh token

  async getRefreshTokenByUserId(userId: Types.ObjectId): Promise<RefreshToken> {
    return await this.refreshTokenModel.findOne({ user: userId }).exec();
  }

  async createRefreshTokenUserId(
    userId: Types.ObjectId,
    token: string,
  ): Promise<RefreshToken> {
    return this.refreshTokenModel.create({
      user: userId,
      token,
      createdAt: new Date(),
    });
  }

  async deleteRefreshTokenByUserId(
    userId: Types.ObjectId,
  ): Promise<RefreshToken> {
    // TODO - should be done together with deleteUser
    return this.refreshTokenModel.findOneAndDelete({ user: userId }).exec();
  }

  async deleteRefreshToken(token: string): Promise<RefreshToken> {
    return this.refreshTokenModel.findOneAndDelete({ token }).exec();
  }
}
