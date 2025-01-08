import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTripItemDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly checked: boolean;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly size: string;

  @IsOptional()
  @IsString()
  readonly color: string;
}
