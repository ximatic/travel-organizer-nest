import { IsString } from 'class-validator';

import { PasswordSetupDto } from '../../common/dto/password-setup.dto';

export class UpdateUserPasswordDto extends PasswordSetupDto {
  @IsString()
  readonly currentPassword: string;
}
