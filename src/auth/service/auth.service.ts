import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/service/users.service';
import { TokenService } from './token.service';

import { AuthToken } from '../model/auth-token.model';

import { User } from '../../users/schema/user.schema';
import { UserProfile } from '../../users/schema/user-profile.schema';
import { AccessToken } from '../schema/access-token.schema';

import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {
  private saltOrRounds: number = 10;

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(email: string, password: string): Promise<AuthToken> {
    const user = await this.usersService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.tokenService.createAccessTokenUserId(
      user._id,
      await this.createAccessToken(user),
    );
    if (!accessToken) {
      throw new InternalServerErrorException(
        `Can't process request and create an access token. Please try again later.`,
      );
    }

    return this.createTokenResponse(accessToken.token);
  }

  async logout(accessToken: AccessToken): Promise<any> {
    // TODO - delete refresh token too
    return this.tokenService.deleteAccessToken(accessToken.token);
  }

  async verifyToken(accessToken: AccessToken): Promise<AuthToken> {
    // TODO - token verification (by JWT) and existence (in DB) is done in Auth Guard so no extra logic is needed for now
    return this.createTokenResponse(accessToken.token);
  }

  // async refreshToken(): Promise<AuthToken> {
  //   // TODO - return new access token
  // }

  async getProfile(accessToken: AccessToken): Promise<UserProfile> {
    return this.usersService.getUserProfileByUserId(accessToken.userId._id);
  }

  async signup(signUpDto: SignUpDto): Promise<AuthToken> {
    const hashPasssword = await this.hashPassword(signUpDto.password);
    const user = await this.usersService.createUser({
      email: signUpDto.email,
      password: hashPasssword,
    });

    if (!user) {
      throw new InternalServerErrorException(
        `Can't process request and create an user. Please try again later.`,
      );
    }
    const userProfile = await this.usersService.createUserProfile({
      userId: user._id,
      firstname: signUpDto.firstname,
      lastname: signUpDto.lastname,
    });

    if (!userProfile) {
      throw new InternalServerErrorException(
        `Can't process request and create a profile. Please try again later.`,
      );
    }

    const accessToken = await this.tokenService.createAccessTokenUserId(
      user._id,
      await this.createAccessToken(user),
    );
    if (!accessToken) {
      throw new InternalServerErrorException(
        `Can't process request and create an access token. Please try again later.`,
      );
    }

    return this.createTokenResponse(accessToken.token);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  private createAccessToken(user: User): Promise<any> {
    return this.jwtService.signAsync({
      sub: user._id,
      email: user.email,
    });
  }

  private createTokenResponse(
    accessToken: string,
    refreshToken?: string,
  ): AuthToken {
    return { accessToken, refreshToken };
  }
}
