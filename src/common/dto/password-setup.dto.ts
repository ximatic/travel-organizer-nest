import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

import { PASSWORD_REGEX } from '../constants/password.constants';

export class PasswordSetupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Matches(PASSWORD_REGEX, {
    message: 'Password is not meeting a complexity criteria',
  })
  readonly password?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Matches(PASSWORD_REGEX, {
    message: 'Password Repeat is not meeting a complexity criteria',
  })
  readonly passwordRepeat?: string;
}
