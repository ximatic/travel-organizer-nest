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

import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';

import { AuthToken } from '../model/auth-token.model';
import { UserInfoResponse } from 'src/users/model/user-info.model';
import { UserProfileResponse } from '../../users/model/user-profile.model';
import { UserSettingsResponse } from 'src/users/model/user-settings.model';

import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateUserInfoDto } from '../../users/dto/update-user-info.dto';
import { UpdateUserProfileDto } from '../../users/dto/update-user-profile.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UpdateUserSettingsDto } from '../../users/dto/update-user-settings.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthToken> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async getUserInfo(@Req() request: Request): Promise<UserInfoResponse> {
    return this.authService.getUserInfo(request['accessToken']);
  }

  // @Put('user/info')
  // @UseGuards(AuthGuard)
  // async updateUserInfo(
  //   @Req() request: Request,
  //   @Body() updateUserInfoDto: UpdateUserInfoDto,
  // ): Promise<UserInfoResponse> {
  //   return this.authService.updateUserInfo(
  //     request['accessToken'],
  //     updateUserInfoDto,
  //   );
  // }

  // user profile

  @Get('user/profile')
  @UseGuards(AuthGuard)
  async getUserProfile(@Req() request: Request): Promise<UserProfileResponse> {
    return this.authService.getUserProfile(request['accessToken']);
  }

  @Put('user/profile')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async getUserSettings(
    @Req() request: Request,
  ): Promise<UserSettingsResponse> {
    return this.authService.getUserSettings(request['accessToken']);
  }

  @Put('user/settings')
  @UseGuards(AuthGuard)
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
