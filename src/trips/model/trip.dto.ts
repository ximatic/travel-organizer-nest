import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TripItemDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  checked: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  color: string;
}

export class TripDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
