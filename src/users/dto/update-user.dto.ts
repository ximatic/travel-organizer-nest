import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly passwordRepeat: string;
}
