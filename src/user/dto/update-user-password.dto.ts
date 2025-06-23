import { IsNotEmpty, IsString } from 'class-validator';

import { PasswordSetupDto } from '../../common/dto/password-setup.dto';

export class UpdateUserPasswordDto extends PasswordSetupDto {
  @IsNotEmpty()
  @IsString()
  readonly currentPassword: string;
}
