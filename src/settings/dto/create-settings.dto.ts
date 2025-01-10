import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../model/settings.enum';

export class CreateSettingsDto {
  @IsOptional()
  @Transform(() => SettingsLanguage)
  language: string;

  @IsOptional()
  @Transform(() => SettingsDateFormat)
  dateFormat: SettingsDateFormat;

  @IsOptional()
  @Transform(() => SettingsTimeFormat)
  timeFormat: SettingsTimeFormat;

  @IsOptional()
  @Transform(() => SettingsTheme)
  theme: SettingsTheme;
}
