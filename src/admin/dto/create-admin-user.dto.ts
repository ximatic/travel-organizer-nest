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

export class CreateAdminUserDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
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
