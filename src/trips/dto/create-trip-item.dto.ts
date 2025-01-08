import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTripItemDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
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
