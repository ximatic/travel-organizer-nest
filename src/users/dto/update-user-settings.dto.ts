import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../model/user-settings.enum';

export class UpdateUserSettingsDto {
  @IsOptional()
  @Transform(() => UserSettingsLanguage)
  language: UserSettingsLanguage;

  @IsOptional()
  @Transform(() => UserSettingsDateFormat)
  dateFormat: UserSettingsDateFormat;

  @IsOptional()
  @Transform(() => UserSettingsTimeFormat)
  timeFormat: UserSettingsTimeFormat;

  @IsOptional()
  @Transform(() => UserSettingsTheme)
  theme: UserSettingsTheme;
}
