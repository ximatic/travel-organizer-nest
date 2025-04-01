import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { TokenGuard } from '../../token/guards/token.guard';
import { AuthService } from '../service/auth.service';

import { AuthToken } from '../model/auth-token.model';
import { UserInfoResponse } from 'src/users/model/user-info.model';
import { UserProfileResponse } from '../../users/model/user-profile.model';
import { UserSettingsResponse } from 'src/users/model/user-settings.model';

import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateUserProfileDto } from '../../users/dto/update-user-profile.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UpdateUserSettingsDto } from '../../users/dto/update-user-settings.dto';
import { UpdateUserDataDto } from '../../users/dto/update-user-data.dto';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import { UserDataResponse } from '../../users/model/user-data.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthToken> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TokenGuard)
  logout(@Req() request: Request): void {
    try {
      this.authService.logout(request['accessToken']);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TokenGuard)
  async verifyToken(@Req() request: Request): Promise<AuthToken> {
    return this.authService.verifyToken(request['accessToken']);
  }

  //   @Post('refresh')
  //   refreshToken(): Promise<AuthToken> {
  //     return this.authService.refreshToken();
  //   }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto): Promise<AuthToken> {
    if (signUpDto.password !== signUpDto.passwordRepeat) {
      throw new BadRequestException(
        `Provided passwords are not the same. Please try again later.`,
      );
    }

    return this.authService.signup(signUpDto);
  }

  // user

  @Put('user')
  @UseGuards(TokenGuard)
  updateUser(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): void {
    try {
      this.authService.updateUser(request['accessToken'], updateUserDto);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  // user info

  @Get('user/info')
  @UseGuards(TokenGuard)
  async getUserInfo(@Req() request: Request): Promise<UserInfoResponse> {
    return this.authService.getUserInfo(request['accessToken']);
  }

  // @Put('user/info')
  // @UseGuards(TokenGuard)
  // async updateUserInfo(
  //   @Req() request: Request,
  //   @Body() updateUserInfoDto: UpdateUserInfoDto,
  // ): Promise<UserInfoResponse> {
  //   return this.authService.updateUserInfo(
  //     request['accessToken'],
  //     updateUserInfoDto,
  //   );
  // }

  // user data (profile + email)

  @Put('user/data')
  @UseGuards(TokenGuard)
  async updateUserData(
    @Req() request: Request,
    @Body() updateUserDataDto: UpdateUserDataDto,
  ): Promise<UserDataResponse> {
    return this.authService.updateUserData(
      request['accessToken'],
      updateUserDataDto,
    );
  }

  // user password

  @Put('user/password')
  @UseGuards(TokenGuard)
  async updateUserPassword(
    @Req() request: Request,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    if (
      updateUserPasswordDto.newPassword !==
      updateUserPasswordDto.newPasswordRepeat
    ) {
      throw new BadRequestException(
        `Provided passwords are not the same. Please try again later.`,
      );
    }

    return this.authService.updateUserPassword(
      request['accessToken'],
      updateUserPasswordDto,
    );
  }

  // user profile

  @Get('user/profile')
  @UseGuards(TokenGuard)
  async getUserProfile(@Req() request: Request): Promise<UserProfileResponse> {
    return this.authService.getUserProfile(request['accessToken']);
  }

  @Put('user/profile')
  @UseGuards(TokenGuard)
  async updateUserProfile(
    @Req() request: Request,
    @Body() updateProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponse> {
    return this.authService.updateUserProfile(
      request['accessToken'],
      updateProfileDto,
    );
  }

  // user settings

  @Get('user/settings')
  @UseGuards(TokenGuard)
  async getUserSettings(
    @Req() request: Request,
  ): Promise<UserSettingsResponse> {
    return this.authService.getUserSettings(request['accessToken']);
  }

  @Put('user/settings')
  @UseGuards(TokenGuard)
  updateUserSettings(
    @Req() request: Request,
    @Body() updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettingsResponse> {
    return this.authService.updateUserSettings(
      request['accessToken'],
      updateUserSettingsDto,
    );
  }
}
