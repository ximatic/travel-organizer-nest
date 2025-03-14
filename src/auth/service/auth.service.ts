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
import { AccessToken } from '../schema/access-token.schema';

import { DEFAULT_USER_SETTINGS } from '../../users/constants/user-settings.constants';

import { UserInfoResponse } from '../../users/model/user-info.model';
import { UserProfileResponse } from '../../users/model/user-profile.model';
import { UserSettingsResponse } from '../../users/model/user-settings.model';

import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UpdateUserInfoDto } from '../../users/dto/update-user-info.dto';
import { UpdateUserProfileDto } from '../../users/dto/update-user-profile.dto';
import { UpdateUserSettingsDto } from '../../users/dto/update-user-settings.dto';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import { UpdateUserDataDto } from '../../users/dto/update-user-data.dto';
import { UserDataResponse } from '../../users/model/user-data.model';

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
      firstname: signUpDto.firstname,
      lastname: signUpDto.lastname,
      user: user._id,
    });
    if (!userProfile) {
      throw new InternalServerErrorException(
        `Can't process request and create a profile. Please try again later.`,
      );
    }

    const userSettings = await this.usersService.createUserSettings({
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

  // user

  async updateUser(
    accessToken: AccessToken,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (
      !this.isValidPassword(
        updateUserDto.password,
        updateUserDto.passwordRepeat,
      )
    ) {
      throw new InternalServerErrorException(
        `Password is invalid. Please try again later.`,
      );
    }

    return this.usersService.updateUser(
      accessToken.user._id.toString(),
      updateUserDto,
    );
  }

  // user info

  async getUserInfo(accessToken: AccessToken): Promise<UserInfoResponse> {
    return this.usersService.getUserInfo(accessToken.user);
  }

  // TODO - remove?
  // async updateUserInfo(
  //   accessToken: AccessToken,
  //   updateUserInfoDto: UpdateUserInfoDto,
  // ): Promise<UserInfoResponse> {
  //   return this.usersService.updateUserInfo(
  //     accessToken.user,
  //     updateUserInfoDto,
  //   );
  // }

  // user data

  async updateUserData(
    accessToken: AccessToken,
    updateUserDataDto: UpdateUserDataDto,
  ): Promise<UserDataResponse> {
    return this.usersService.updateUserData(
      accessToken.user,
      updateUserDataDto,
    );
  }

  // user password

  async updateUserPassword(
    accessToken: AccessToken,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    const isMatch = await bcrypt.compare(
      updateUserPasswordDto.currentPassword,
      accessToken.user?.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    if (
      !this.isValidPassword(
        updateUserPasswordDto.newPassword,
        updateUserPasswordDto.newPasswordRepeat,
      )
    ) {
      throw new InternalServerErrorException(
        `Passwords are invalid. Please try again later.`,
      );
    }

    const hashPasssword = await this.hashPassword(
      updateUserPasswordDto.newPassword,
    );
    try {
      this.usersService.updateUserPassword(
        accessToken.user._id.toString(),
        hashPasssword,
      );
    } catch {
      throw new InternalServerErrorException(
        `Can't process request and create a settings. Please try again later.`,
      );
    }
  }

  // user profile

  async getUserProfile(accessToken: AccessToken): Promise<UserProfileResponse> {
    return this.usersService.getUserProfile(accessToken.user);
  }

  async updateUserProfile(
    accessToken: AccessToken,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponse> {
    return this.usersService.updateUserProfile(
      accessToken.user,
      updateUserProfileDto,
    );
  }

  // user settings

  async getUserSettings(
    accessToken: AccessToken,
  ): Promise<UserSettingsResponse> {
    return this.usersService.getUserSettings(accessToken.user);
  }

  async updateUserSettings(
    accessToken: AccessToken,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettingsResponse> {
    return this.usersService.updateUserSettings(
      accessToken.user,
      updateUserSettingsDto,
    );
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
