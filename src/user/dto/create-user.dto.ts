import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../models/user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @Transform(() => UserRole)
  readonly role?: UserRole;
}
