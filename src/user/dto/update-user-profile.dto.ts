import { IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  readonly firstname?: string;

  @IsOptional()
  @IsString()
  readonly lastname?: string;
}
