import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { PasswordSetupDto } from '../../common/dto/password-setup.dto';

import { UserRole } from '../models/user.enum';

export class UpdateUserDto extends PasswordSetupDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @Transform(() => UserRole)
  readonly role?: UserRole;
}
