import { IsNotEmpty, IsString } from 'class-validator';

import { PasswordSetupDto } from '../../common/dto/password-setup.dto';

export class SignUpDto extends PasswordSetupDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;
}
