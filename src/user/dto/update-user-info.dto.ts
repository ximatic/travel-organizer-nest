import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { UpdateUserProfileDto } from './update-user-profile.dto';
import { UpdateUserSettingsDto } from './update-user-settings.dto';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @Transform(() => UpdateUserProfileDto)
  readonly profile?: UpdateUserProfileDto;

  @IsOptional()
  @Transform(() => UpdateUserSettingsDto)
  readonly settings?: UpdateUserSettingsDto;
}
