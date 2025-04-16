import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { BaseEntity } from '../../common/schemas/base-entity.schema';

import { UserRole } from '../models/user.enum';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: UserRole.User })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
