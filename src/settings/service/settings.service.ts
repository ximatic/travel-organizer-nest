import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Settings } from '../schema/settings.schema';

import { DEFAULT_SETTINGS } from '../constants/settings.constants';

import { CreateSettingsDto } from '../dto/create-settings.dto';
import { UpdateSettingsDto } from '../dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private readonly settingsModel: Model<Settings>,
  ) {}

  async getSettings(id?: string): Promise<Settings> {
    if (id) {
      return this.settingsModel.findOne({ _id: id }).exec();
    } else {
      // if no ID provided, create new settings using Default values and return back
      return this.createSettings(DEFAULT_SETTINGS);
    }
  }

  async createSettings(
    createSettingsDto: CreateSettingsDto,
  ): Promise<Settings> {
    return this.settingsModel.create(createSettingsDto);
  }

  async updateSettings(
    id: string,
    updateSettingsDto: UpdateSettingsDto,
  ): Promise<Settings> {
    return this.settingsModel
      .findByIdAndUpdate({ _id: id }, updateSettingsDto, { new: true })
      .exec();
  }

  async deleteSettings(id: string): Promise<Settings> {
    return this.settingsModel.findByIdAndDelete({ _id: id }).exec();
  }

  async resetSettings(id: string): Promise<Settings> {
    return this.updateSettings(id, DEFAULT_SETTINGS);
  }

  // // TODO - temp solution, move it to DB
  // private settings: Settings = DEFAULT_SETTINGS;

  // getSettings(): Settings {
  //   return this.settings;
  // }

  // createSettings(settings: SettingsDto): Settings {
  //   this.settings = new Settings(settings);

  //   return this.settings;
  // }

  // updateSettings(settings: SettingsDto): Settings {
  //   this.settings = new Settings(settings);

  //   return this.settings;
  // }

  // resetSettings(): Settings {
  //   this.settings = DEFAULT_SETTINGS;

  //   return this.settings;
  // }
}
