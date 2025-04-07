import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { TokenGuard } from '../../token/guards/token.guard';

import { UserService } from '../services/user.service';

import { PasswordHelper } from '../../common/helpers/pasword.helper';

import { UserInfoResponse } from '../models/user-info.model';
import { UserProfileResponse } from '../models/user-profile.model';
import { UserSettingsResponse } from '../models/user-settings.model';

import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserSettingsDto } from '../dto/update-user-settings.dto';
import { UpdateUserDataDto } from '../dto/update-user-data.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { UserDataResponse } from '../models/user-data.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // user

  @Put('')
  @UseGuards(TokenGuard)
  updateUser(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): void {
    if (
      !PasswordHelper.isValidPassword(
        updateUserDto.password,
        updateUserDto.passwordRepeat,
      )
    ) {
      throw new InternalServerErrorException(
        `Provided passwords are not the same. Please try again later.`,
      );
    }

    try {
      this.userService.updateUser(
        request['accessToken'].user._id.toString(),
        updateUserDto,
      );
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  // user info

  @Get('info')
  @UseGuards(TokenGuard)
  async getUserInfo(@Req() request: Request): Promise<UserInfoResponse> {
    return this.userService.getUserInfo(request['accessToken'].user);
  }

  // @Put('info')
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

  @Put('data')
  @UseGuards(TokenGuard)
  async updateUserData(
    @Req() request: Request,
    @Body() updateUserDataDto: UpdateUserDataDto,
  ): Promise<UserDataResponse> {
    return this.userService.updateUserData(
      request['accessToken'].user,
      updateUserDataDto,
    );
  }

  // user password

  @Put('password')
  @UseGuards(TokenGuard)
  async updateUserPassword(
    @Req() request: Request,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    const user = request['accessToken'].user;
    if (
      !PasswordHelper.isValidPassword(
        updateUserPasswordDto.newPassword,
        updateUserPasswordDto.newPasswordRepeat,
      )
    ) {
      // TODO provide unified error codes for frontend and backend
      throw new BadRequestException(
        `Provided passwords are not the same. Please try again later.`,
      );
    }

    if (
      !(await PasswordHelper.passwordsMatch(
        updateUserPasswordDto.currentPassword,
        user.password,
      ))
    ) {
      throw new UnauthorizedException();
    }

    const hashPasssword = await PasswordHelper.hashPassword(
      updateUserPasswordDto.newPassword,
    );
    try {
      this.userService.updateUserPassword(user._id.toString(), hashPasssword);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request and update user password. Please try again later.`,
      );
    }
  }

  // user profile

  @Get('profile')
  @UseGuards(TokenGuard)
  async getUserProfile(@Req() request: Request): Promise<UserProfileResponse> {
    return this.userService.getUserProfile(request['accessToken'].user);
  }

  @Put('profile')
  @UseGuards(TokenGuard)
  async updateUserProfile(
    @Req() request: Request,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponse> {
    return this.userService.updateUserProfile(
      request['accessToken'].user,
      updateUserProfileDto,
    );
  }

  // user settings

  @Get('settings')
  @UseGuards(TokenGuard)
  async getUserSettings(
    @Req() request: Request,
  ): Promise<UserSettingsResponse> {
    return this.userService.getUserSettings(request['accessToken'].user);
  }

  @Put('settings')
  @UseGuards(TokenGuard)
  updateUserSettings(
    @Req() request: Request,
    @Body() updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettingsResponse> {
    return this.userService.updateUserSettings(
      request['accessToken'].user,
      updateUserSettingsDto,
    );
  }
}
