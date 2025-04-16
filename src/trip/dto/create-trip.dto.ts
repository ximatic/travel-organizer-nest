import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
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
}
