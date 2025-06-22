import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { DEFAULT_USER_SETTINGS } from '../../user/constants/user-settings.constants';

import { UserService } from '../../user/services/user.service';

import {
  AdminUserProfileResponse,
  AdminUserResponse,
} from '../models/admin-user.model';

import { User } from '../../user/schemas/user.schema';

import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';
import { UserProfile } from 'src/user/schemas/user-profile.schema';
import { UserProfileResponse } from 'src/user/models/user-profile.model';

@Injectable()
export class AdminService {
  private saltOrRounds: number = 10;

  constructor(private userService: UserService) {}

  async getUsers(): Promise<AdminUserResponse[]> {
    return (await this.userService.getUsers()).map((user: User) =>
      this.createAdminUserResponse(user),
    );
  }

  async getUser(id: string): Promise<AdminUserProfileResponse> {
    const user = await this.userService.getUserById(id);
    let userProfile;
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } else {
      userProfile = await this.userService.getUserProfile(user);
    }

    return this.createAdminUserProfileResponse(user, userProfile);
  }

  async createUser(
    createAdminUserDto: CreateAdminUserDto,
  ): Promise<AdminUserProfileResponse> {
    const hashPasssword = await this.hashPassword(createAdminUserDto.password);
    const user = await this.userService.createUser({
      email: createAdminUserDto.email,
      password: hashPasssword,
      role: createAdminUserDto.role,
    });

    if (!user) {
      throw new InternalServerErrorException(
        `Can't process request and create an user. Please try again later.`,
      );
    }

    const userProfile = await this.userService.createUserProfile({
      firstname: createAdminUserDto.firstname || '',
      lastname: createAdminUserDto.lastname || '',
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

    return this.createAdminUserProfileResponse(user, userProfile);
  }

  async updateUser(
    id: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<AdminUserProfileResponse> {
    let user = await this.userService.getUserById(id);
    if (
      updateAdminUserDto.email ||
      updateAdminUserDto.password ||
      updateAdminUserDto.role
    ) {
      const password = updateAdminUserDto.password
        ? await this.hashPassword(updateAdminUserDto.password)
        : user.password;
      user = await this.userService.updateUser(id, {
        email: updateAdminUserDto.email || user.email,
        password: password,
        role: updateAdminUserDto.role || user.role,
      });
    }

    if (!user) {
      throw new InternalServerErrorException(
        `Can't process request and update an user. Please try again later.`,
      );
    }

    let userProfile;
    if (updateAdminUserDto.firstname || updateAdminUserDto.lastname) {
      try {
        userProfile = await this.userService.updateUserProfile(user, {
          firstname: updateAdminUserDto.firstname,
          lastname: updateAdminUserDto.lastname,
        });
      } catch {
        throw new InternalServerErrorException(
          `Can't process request and update an user. Please try again later.`,
        );
      }
    } else {
      userProfile = await this.userService.getUserProfile(user);
    }

    return this.createAdminUserProfileResponse(user, userProfile);
  }

  async deleteUser(id: string): Promise<AdminUserResponse> {
    return this.createAdminUserResponse(await this.userService.deleteUser(id));
  }

  // other

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  private createAdminUserResponse(user: User): AdminUserResponse {
    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    } as AdminUserResponse;
  }

  private createAdminUserProfileResponse(
    user: User,
    userProfile: UserProfile | UserProfileResponse,
  ): AdminUserProfileResponse {
    return {
      ...this.createAdminUserResponse(user),
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
    } as AdminUserProfileResponse;
  }
}
