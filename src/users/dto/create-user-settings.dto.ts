import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../../settings/model/settings.enum';

export class CreateUserSettingsDto {
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

  @IsNotEmpty()
  @IsString()
  readonly user: Types.ObjectId;
}
