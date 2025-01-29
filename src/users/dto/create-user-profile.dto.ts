import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  readonly user: Types.ObjectId;
}
