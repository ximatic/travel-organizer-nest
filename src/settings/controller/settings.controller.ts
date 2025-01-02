import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { SettingsService } from '../service/settings.service';

import { Settings } from '../model/settings.model';
import { SettingsDto } from '../model/settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): Settings {
    return this.settingsService.getSettings();
  }

  @Post()
  createSettings(@Body() settings: SettingsDto): Settings {
    return this.settingsService.createSettings(settings);
  }

  @Put()
  updateSettings(@Body() settings: SettingsDto): Settings {
    return this.settingsService.updateSettings(settings);
  }

  @Delete()
  resetSettings(): Settings {
    return this.settingsService.resetSettings();
  }
}
