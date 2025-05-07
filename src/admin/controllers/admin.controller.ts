import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { TokenGuard } from '../../token/guards/token.guard';
import { AdminRoleGuard } from '../guards/admin-role.guard';

import { AdminService } from '../services/admin.service';

import { PasswordValidationPipe } from '../../common/pipes/password-validation.pipe';

import { AdminUserResponse } from '../models/admin-user.model';

import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // user admin

  @Get('user')
  @UseGuards(TokenGuard, AdminRoleGuard)
  async getAdminUsers(): Promise<AdminUserResponse[]> {
    try {
      return this.adminService.getUsers();
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  @Get('user/:id')
  @UseGuards(TokenGuard, AdminRoleGuard)
  async getAdminUser(@Param('id') id: string): Promise<AdminUserResponse> {
    try {
      return this.adminService.getUser(id);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  @Post('user')
  @UseGuards(TokenGuard, AdminRoleGuard)
  @UsePipes(PasswordValidationPipe)
  async createAdminUser(
    @Body() createAdminUserDto: CreateAdminUserDto,
  ): Promise<AdminUserResponse> {
    try {
      return this.adminService.createUser(createAdminUserDto);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  @Put('user/:id')
  @UseGuards(TokenGuard, AdminRoleGuard)
  @UsePipes(PasswordValidationPipe)
  async updateAdminUser(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<AdminUserResponse> {
    try {
      return this.adminService.updateUser(id, updateAdminUserDto);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }

  @Delete('user/:id')
  @UseGuards(TokenGuard, AdminRoleGuard)
  async deleteAdminUser(@Param('id') id: string): Promise<void> {
    try {
      await this.adminService.deleteUser(id);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }
}
