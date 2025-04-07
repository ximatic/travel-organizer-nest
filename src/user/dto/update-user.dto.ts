import { IsOptional, IsString } from 'class-validator';

import { PasswordSetupDto } from '../../common/dto/password-setup.dto';

export class UpdateUserDto extends PasswordSetupDto {
  @IsOptional()
  @IsString()
  readonly email?: string;
}
