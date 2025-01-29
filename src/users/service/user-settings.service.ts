import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { UserSettings } from '../schema/user-settings.schema';

import { CreateUserSettingsDto } from '../dto/create-user-settings.dto';
import { UpdateUserSettingsDto } from '../dto/update-user-settings.dto';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(UserSettings.name)
    private readonly userSettingsModel: Model<UserSettings>,
  ) {}

  // user settings

  async getUserSettings(): Promise<UserSettings[]> {
    return this.userSettingsModel.find().exec();
  }

  async getUserSettingsById(id: string): Promise<UserSettings> {
    return await this.userSettingsModel.findOne({ _id: id }).exec();
  }

  async createUserSettings(
    createUserSettingsDto: CreateUserSettingsDto,
  ): Promise<UserSettings> {
    return this.userSettingsModel.create({
      ...createUserSettingsDto,
      createdAt: new Date(),
    });
  }

  async updateUserSettings(
    id: string,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettings> {
    return this.userSettingsModel
      .findByIdAndUpdate(
        { _id: id },
        { ...updateUserSettingsDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteUserSettings(id: string): Promise<UserSettings> {
    return this.userSettingsModel.findByIdAndDelete({ _id: id }).exec();
  }

  // user settings - by User ID

  async getUserSettingsByUserId(userId: Types.ObjectId): Promise<UserSettings> {
    return this.userSettingsModel.findOne({ user: userId }).exec();
  }

  async updateUserSettingsByUserId(
    userId: Types.ObjectId,
    updateUserSettingsDto: UpdateUserSettingsDto,
  ): Promise<UserSettings> {
    return this.userSettingsModel
      .findOneAndUpdate(
        { user: userId },
        { ...updateUserSettingsDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteUserSettingsByUserId(
    userId: Types.ObjectId,
  ): Promise<UserSettings> {
    return this.userSettingsModel.findOneAndDelete({ user: userId }).exec();
  }
}
