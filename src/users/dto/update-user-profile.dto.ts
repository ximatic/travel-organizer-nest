import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  readonly firstname: string;

  @IsOptional()
  @IsBoolean()
  readonly lastname: string;

  @IsOptional()
  @IsString()
  readonly role: string;
}
