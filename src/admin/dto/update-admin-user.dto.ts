import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { PASSWORD_REGEX } from '../../common/constants/password.constants';

import { UserRole } from '../../user/models/user.enum';

export class UpdateAdminUserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @Matches(PASSWORD_REGEX, {
    message: 'Password is not meeting a complexity criteria',
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly firstname: string;

  @IsOptional()
  @IsString()
  readonly lastname: string;

  @IsOptional()
  @Transform(({ value }) => value as UserRole)
  readonly role?: UserRole;
}
