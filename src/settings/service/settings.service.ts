import { Injectable } from '@nestjs/common';

import { DEFAULT_SETTINGS } from '../constants/settings.constants';

import { Settings } from '../model/settings.model';
import { SettingsDto } from '../model/settings.dto';

@Injectable()
export class SettingsService {
  // TODO - temp solution, move it to DB
  private settings: Settings = DEFAULT_SETTINGS;

  getSettings(): Settings {
    return this.settings;
  }

  createSettings(settings: SettingsDto): Settings {
    this.settings = new Settings(settings);

    return this.settings;
  }

  updateSettings(settings: SettingsDto): Settings {
    this.settings = new Settings(settings);

    return this.settings;
  }

  resetSettings(): Settings {
    this.settings = DEFAULT_SETTINGS;

    return this.settings;
  }
}
