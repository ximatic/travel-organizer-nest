import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../model/settings.enum';

export type SettingsDocument = mongoose.HydratedDocument<Settings>;

@Schema()
export class Settings {
  @Prop({ required: true })
  language: SettingsLanguage;

  @Prop({ required: true })
  dateFormat: SettingsDateFormat;

  @Prop({ required: true })
  timeFormat: SettingsTimeFormat;

  @Prop({ required: true })
  theme: SettingsTheme;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
