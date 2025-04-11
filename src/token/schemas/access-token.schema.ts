import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../../user/schemas/user.schema';

export type AccessTokenDocument = mongoose.HydratedDocument<AccessToken>;

@Schema({
  collection: 'access-tokens',
})
export class AccessToken {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({ required: true })
  createdAt: Date;
}

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
