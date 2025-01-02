import { IsNotEmpty, IsString } from 'class-validator';

export class SettingsDto {
  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  dateFormat: string;

  @IsNotEmpty()
  @IsString()
  timeFormat: string;

  @IsNotEmpty()
  @IsString()
  theme: string;
}
