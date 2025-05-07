import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../../user/models/user.enum';

export class CreateAdminUserDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly firstname: string;

  @IsOptional()
  @IsString()
  readonly lastname: string;

  @IsOptional()
  @Transform(() => UserRole)
  readonly role?: UserRole;
}
