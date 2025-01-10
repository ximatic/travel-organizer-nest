import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { SettingsService } from '../service/settings.service';

import { Settings } from '../schema/settings.schema';

import { CreateSettingsDto } from '../dto/create-settings.dto';
import { UpdateSettingsDto } from '../dto/update-settings.dto';
import { Types } from 'mongoose';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<Settings> {
    return this.settingsService.getSettings();
  }

  @Get(':id')
  async getSettingsById(@Param('id') id: string): Promise<Settings> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const settings = await this.settingsService.getSettings(id);
        if (settings) {
          return settings;
        } else {
          throw new NotFoundException(`Settings with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid settings ID: ${id}`);
      }
    } catch (error: any) {
      this.handleSettingsError(id, error);
    }
  }

  @Post()
  async createSettings(
    @Body() createSettingsDto: CreateSettingsDto,
  ): Promise<Settings> {
    return this.settingsService.createSettings(createSettingsDto);
  }

  @Put(':id')
  updateSettings(
    @Param('id') id: string,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ): Promise<Settings> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const settings = this.settingsService.updateSettings(
          id,
          updateSettingsDto,
        );
        if (settings) {
          return settings;
        } else {
          throw new NotFoundException(`Settings with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid settings ID: ${id}`);
      }
    } catch (error: any) {
      this.handleSettingsError(id, error);
    }
  }

  @Delete(':id')
  resetSettings(@Param('id') id: string): Promise<Settings> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const settings = this.settingsService.resetSettings(id);
        if (settings) {
          return settings;
        } else {
          throw new NotFoundException(`Settings with ID ${id} not found`);
        }
      } else {
        throw new BadRequestException(`Invalid settings ID: ${id}`);
      }
    } catch (error: any) {
      this.handleSettingsError(id, error);
    }
  }

  // other

  private handleSettingsError(id: string, error: any): void {
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException
    ) {
      throw error;
    } else {
      // TODO - think about better solution for logs
      console.error('Settings request error:', error);
      throw new InternalServerErrorException(
        `Can't process request. Try again later.`,
      );
    }
  }
}
