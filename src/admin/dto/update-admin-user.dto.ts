import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
