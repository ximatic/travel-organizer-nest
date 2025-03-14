import { IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  readonly currentPassword: string;

  @IsString()
  readonly newPassword: string;

  @IsString()
  readonly newPasswordRepeat: string;
}
