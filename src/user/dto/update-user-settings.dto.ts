import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../models/user-settings.enum';

export class UpdateUserSettingsDto {
  @IsOptional()
  @Transform(({ value }) => value as UserSettingsLanguage)
  language: UserSettingsLanguage;

  @IsOptional()
  @Transform(({ value }) => value as UserSettingsDateFormat)
  dateFormat: UserSettingsDateFormat;

  @IsOptional()
  @Transform(({ value }) => value as UserSettingsTimeFormat)
  timeFormat: UserSettingsTimeFormat;

  @IsOptional()
  @Transform(({ value }) => value as UserSettingsTheme)
  theme: UserSettingsTheme;
}
