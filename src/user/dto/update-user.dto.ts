import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { PasswordSetupDto } from '../../common/dto/password-setup.dto';

import { UserRole } from '../models/user.enum';

export class UpdateUserDto extends PasswordSetupDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  // TODO - it should be only allowed from Admin module
  @IsOptional()
  @Transform(({ value }) => value as UserRole)
  readonly role?: UserRole;
}
