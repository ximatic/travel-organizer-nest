import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { DEFAULT_USER_SETTINGS } from '../../user/constants/user-settings.constants';

import { UserService } from '../../user/services/user.service';

import { AdminUserResponse } from '../models/admin-user.model';

import { User } from '../../user/schemas/user.schema';

import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';

@Injectable()
export class AdminService {
  private saltOrRounds: number = 10;

  constructor(private userService: UserService) {}

  async getUsers(): Promise<AdminUserResponse[]> {
    return (await this.userService.getUsers()).map((user: User) =>
      this.createAdminUserResponse(user),
    );
  }

  async getUser(id: string): Promise<AdminUserResponse> {
    return this.createAdminUserResponse(await this.userService.getUserById(id));
  }

  async createUser(
    createAdminUserDto: CreateAdminUserDto,
  ): Promise<AdminUserResponse> {
    const hashPasssword = await this.hashPassword(createAdminUserDto.password);
    const user = await this.userService.createUser({
      email: createAdminUserDto.email,
      password: hashPasssword,
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

    return this.createAdminUserResponse(user);
  }

  async updateUser(
    id: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<AdminUserResponse> {
    let user;
    if (
      updateAdminUserDto.email ||
      updateAdminUserDto.password ||
      updateAdminUserDto.role
    ) {
      const hashPasssword = await this.hashPassword(
        updateAdminUserDto.password,
      );
      user = await this.userService.updateUser(id, {
        email: updateAdminUserDto.email,
        password: hashPasssword,
        role: updateAdminUserDto.role,
      });
    } else {
      user = await this.userService.getUserById(id);
    }

    if (!user) {
      throw new InternalServerErrorException(
        `Can't process request and update an user. Please try again later.`,
      );
    }

    if (updateAdminUserDto.firstname || updateAdminUserDto.lastname) {
      try {
        await this.userService.updateUserProfile(user, {
          firstname: updateAdminUserDto.firstname,
          lastname: updateAdminUserDto.lastname,
        });
      } catch {
        throw new InternalServerErrorException(
          `Can't process request and update an user. Please try again later.`,
        );
      }
    }

    return this.createAdminUserResponse(user);
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
}
