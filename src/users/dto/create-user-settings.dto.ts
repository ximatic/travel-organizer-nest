import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../model/user-settings.enum';

export class CreateUserSettingsDto {
  @IsOptional()
  @Transform(() => UserSettingsLanguage)
  language: string;

  @IsOptional()
  @Transform(() => UserSettingsDateFormat)
  dateFormat: UserSettingsDateFormat;

  @IsOptional()
  @Transform(() => UserSettingsTimeFormat)
  timeFormat: UserSettingsTimeFormat;

  @IsOptional()
  @Transform(() => UserSettingsTheme)
  theme: UserSettingsTheme;

  @IsNotEmpty()
  @IsString()
  readonly user: Types.ObjectId;
}
