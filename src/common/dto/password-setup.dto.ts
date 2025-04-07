import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordSetupDto {
  @IsNotEmpty()
  @IsString()
  readonly password?: string;

  @IsNotEmpty()
  @IsString()
  readonly passwordRepeat?: string;
}
