import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from '../../user/services/user.service';
import { TokenService } from '../../token/services/token.service';

import { AuthToken } from '../models/auth-token.model';

import { User } from '../../user/schemas/user.schema';
import { AccessToken } from '../../token/schemas/access-token.schema';

import { DEFAULT_USER_SETTINGS } from '../../user/constants/user-settings.constants';

import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {
  private saltOrRounds: number = 10;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async login(email: string, password: string): Promise<AuthToken> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

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

  // TODO - consider renaming to createUser
  async signup(signUpDto: SignUpDto): Promise<AuthToken> {
    if (!this.isValidPassword(signUpDto.password, signUpDto.passwordRepeat)) {
      throw new InternalServerErrorException(
        `Password is invalid. Please try again later.`,
      );
    }

    const hashPasssword = await this.hashPassword(signUpDto.password);
    const user = await this.userService.createUser({
      email: signUpDto.email,
      password: hashPasssword,
    });

    if (!user) {
      throw new InternalServerErrorException(
        `Can't process request and create an user. Please try again later.`,
      );
    }

    const userProfile = await this.userService.createUserProfile({
      firstname: signUpDto.firstname,
      lastname: signUpDto.lastname,
      user: user._id,
    });
    if (!userProfile) {
      throw new InternalServerErrorException(
        `Can't process request and create a profile. Please try again later.`,
      );
    }

    const userSettings = await this.userService.createUserSettings({
      ...DEFAULT_USER_SETTINGS,
      user: user._id,
    });
    if (!userSettings) {
      throw new InternalServerErrorException(
        `Can't process request and create a settings. Please try again later.`,
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

  // other

  private isValidPassword(password: string, passwordRepeat: string): boolean {
    // TODO - add extra logic for password requirements
    return password === passwordRepeat;
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
