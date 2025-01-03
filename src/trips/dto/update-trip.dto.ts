import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateTripDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly location: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly endDate: Date;
}
