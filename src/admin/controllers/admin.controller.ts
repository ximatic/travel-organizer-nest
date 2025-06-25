import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { TokenGuard } from '../../token/guards/token.guard';
import { AdminRoleGuard } from '../guards/admin-role.guard';

import { AdminService } from '../services/admin.service';

import { PasswordValidationPipe } from '../../common/pipes/password-validation.pipe';

import {
  AdminUserProfileResponse,
  AdminUserResponse,
} from '../models/admin-user.model';

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
  async getAdminUser(
    @Param('id') id: string,
  ): Promise<AdminUserProfileResponse> {
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
  ): Promise<AdminUserProfileResponse> {
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
  ): Promise<AdminUserProfileResponse> {
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
  async deleteAdminUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<void> {
    if (request['accessToken'].user._id.toString() === id) {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }

    try {
      await this.adminService.deleteUser(id);
    } catch {
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }
}
