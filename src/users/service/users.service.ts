import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { User } from '../schema/user.schema';
import { UserProfile } from '../schema/user-profile.schema';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserProfile.name)
    private readonly userProfileModel: Model<UserProfile>,
  ) {}

  // user

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
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
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(id: string): Promise<User> {
    // TODO - should be done together with deleteUserProfile
    return this.userModel.findByIdAndDelete({ _id: id }).exec();
  }

  // user profile

  async getUserProfiles(): Promise<UserProfile[]> {
    return this.userProfileModel.find().exec();
  }

  async getUserProfile(id: string): Promise<UserProfile> {
    return await this.userProfileModel.findOne({ _id: id }).exec();
  }

  async getUserProfileByUserId(userId: Types.ObjectId): Promise<UserProfile> {
    return this.userProfileModel.findOne({ userId: userId }).exec();
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
      .findByIdAndUpdate({ _id: id }, updateUserProfileDto, { new: true })
      .exec();
  }

  async deleteUserProfile(id: string): Promise<UserProfile> {
    // TODO - shouldn't be possible alone (without deleteUser)
    return this.userProfileModel.findByIdAndDelete({ _id: id }).exec();
  }
}
