import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { UserProfile } from '../schema/user-profile.schema';

import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name)
    private readonly userProfileModel: Model<UserProfile>,
  ) {}

  // user profile

  async getUserProfiles(): Promise<UserProfile[]> {
    return this.userProfileModel.find().exec();
  }

  async getUserProfileById(id: string): Promise<UserProfile> {
    return await this.userProfileModel.findOne({ _id: id }).exec();
  }

  async createUserProfile(
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileModel.create({
      ...createUserProfileDto,
      createdAt: new Date(),
    });
  }

  async updateUserProfile(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileModel
      .findByIdAndUpdate(
        { _id: id },
        { ...updateUserProfileDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteUserProfile(id: string): Promise<UserProfile> {
    return this.userProfileModel.findByIdAndDelete({ _id: id }).exec();
  }

  // user profile - by User ID

  async getUserProfileByUserId(userId: Types.ObjectId): Promise<UserProfile> {
    return this.userProfileModel.findOne({ user: userId }).exec();
  }

  async updateUserProfileByUserId(
    userId: Types.ObjectId,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileModel
      .findOneAndUpdate(
        { user: userId },
        { ...updateUserProfileDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deleteUserProfileByUserId(
    userId: Types.ObjectId,
  ): Promise<UserProfile> {
    return this.userProfileModel.findOneAndDelete({ user: userId }).exec();
  }
}
