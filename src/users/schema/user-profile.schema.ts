import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from './user.schema';

export type UserProfileDocument = mongoose.HydratedDocument<UserProfile>;

@Schema({
  collection: 'user-profiles',
})
export class UserProfile {
  _id: mongoose.Types.ObjectId;

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
  userId: User;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
