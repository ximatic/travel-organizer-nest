import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { BaseEntity } from '../../common/schemas/base-entity.schema';

import { User } from './user.schema';

export type UserProfileDocument = mongoose.HydratedDocument<UserProfile>;

@Schema({
  collection: 'user-profiles',
})
export class UserProfile extends BaseEntity {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
