import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../models/user-settings.enum';

export class CreateUserSettingsDto {
  @IsOptional()
  @Transform(({ value }) => value as UserSettingsLanguage)
  language: string;

  @IsOptional()
  @Transform(({ value }) => value as UserSettingsDateFormat)
  dateFormat: UserSettingsDateFormat;

  @IsOptional()
  @Transform(({ value }) => value as UserSettingsTimeFormat)
  timeFormat: UserSettingsTimeFormat;

  @IsOptional()
  @Transform(({ value }) => value as UserSettingsTheme)
  theme: UserSettingsTheme;

  @IsNotEmpty()
  @IsString()
  readonly user: Types.ObjectId;
}
