import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../schema/user.schema';
import { UserProfile } from '../schema/user-profile.schema';
import { UserSettings } from '../schema/user-settings.schema';

import { UserInfoResponse } from '../model/user-info.model';
import { UserProfileResponse } from '../model/user-profile.model';
import { UserSettingsResponse } from '../model/user-settings.model';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { CreateUserSettingsDto } from '../dto/create-user-settings.dto';
import { UpdateUserSettingsDto } from '../dto/update-user-settings.dto';
import { UserProfileService } from './user-profile.service';
import { UserSettingsService } from './user-settings.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private userProfileService: UserProfileService,
    private userSettingsService: UserSettingsService,
  ) {}

  // user

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<any> {
    return await this.userModel.findOne({ email, password }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto, createdAt: new Date() });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        { _id: id },
        { ...updateUserDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteUser(id: string): Promise<User> {
    // TODO - should be done together with deleteUserProfile
    return this.userModel.findByIdAndDelete({ _id: id }).exec();
  }

  // user info

  async getUserInfo(user: User): Promise<UserInfoResponse> {
    const userProfile = await this.userProfileService.getUserProfileByUserId(
      user._id,
    );
    const userSettings = await this.userSettingsService.getUserSettingsByUserId(
      user._id,
    );

    return this.createUserInfoResponse(user, userProfile, userSettings);
  }

  // TODO - remove?
  // async updateUserInfo(
  //   user: User,
  //   updateUserInfoDto: UpdateUserInfoDto,
  // ): Promise<UserInfoResponse> {
  //   let userProfile;
  //   if (updateUserInfoDto.profile) {
  //     userProfile = await this.userProfileService.updateUserProfileByUserId(
  //       user._id,
  //       updateUserInfoDto.profile,
  //     );
  //   } else {
  //     userProfile = await this.userProfileService.getUserProfileByUserId(
  //       user._id,
  //     );
  //   }

  //   let userSettings;
  //   if (updateUserInfoDto.settings) {
  //     userSettings = await this.userSettingsService.updateUserSettingsByUserId(
  //       user._id,
  //       updateUserInfoDto.settings,
  //     );
  //   } else {
  //     userSettings = await this.userSettingsService.getUserSettingsByUserId(
  //       user._id,
  //     );
  //   }

  //   return this.createUserInfoResponse(user, userProfile, userSettings);
  // }

  // user profile

  async getUserProfile(user: User): Promise<UserProfileResponse> {
    const userProfile = await this.userProfileService.getUserProfileByUserId(
      user._id,
    );

    return this.createUserProfileResponse(userProfile);
  }

  async createUserProfile(
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfileResponse> {
    const userProfile =
      await this.userProfileService.createUserProfile(createUserProfileDto);

    return this.createUserProfileResponse(userProfile);
  }

  async updateUserProfile(
    user: User,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponse> {
    const userProfile = await this.userProfileService.updateUserProfileByUserId(
      user._id,
      updateUserProfileDto,
    );

    return this.createUserProfileResponse(userProfile);
  }

  // user settings

  async getUserSettings(user: User): Promise<UserSettingsResponse> {
    const userSettings = await this.userSettingsService.getUserSettingsByUserId(
      user._id,
    );

    return this.createUserSettingsResponse(userSettings);
  }

  async createUserSettings(
    createUserSettingsDto: CreateUserSettingsDto,
  ): Promise<UserSettingsResponse> {
    const userSettings = await this.userSettingsService.createUserSettings(
      createUserSettingsDto,
    );

    return this.createUserSettingsResponse(userSettings);
  }

  async updateUserSettings(
    user: User,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettingsResponse> {
    const userSettings =
      await this.userSettingsService.updateUserSettingsByUserId(
        user._id,
        updateUserSettingsDto,
      );

    return this.createUserSettingsResponse(userSettings);
  }

  // other

  private createUserInfoResponse(
    user: User,
    userProfile: UserProfile,
    userSettings: UserSettings,
  ): UserInfoResponse {
    return {
      email: user.email,
      profile: this.createUserProfileResponse(userProfile),
      settings: this.createUserSettingsResponse(userSettings),
    } as UserInfoResponse;
  }

  private createUserProfileResponse(
    userProfile: UserProfile,
  ): UserProfileResponse {
    return {
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
    } as UserProfileResponse;
  }

  private createUserSettingsResponse(
    userSettings: UserSettings,
  ): UserSettingsResponse {
    return {
      language: userSettings.language,
      dateFormat: userSettings.dateFormat,
      timeFormat: userSettings.timeFormat,
      theme: userSettings.theme,
    } as UserSettingsResponse;
  }
}
