import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { UpdateUserProfileDto } from './update-user-profile.dto';

export class UpdateUserDataDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @Transform(() => UpdateUserProfileDto)
  profile?: UpdateUserProfileDto;
}
