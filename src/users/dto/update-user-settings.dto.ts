import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../model/user-settings.enum';

export class UpdateUserSettingsDto {
  @IsOptional()
  @Transform(() => SettingsLanguage)
  language: SettingsLanguage;

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
