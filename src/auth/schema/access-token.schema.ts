import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../../users/schema/user.schema';

export type AccessTokenDocument = mongoose.HydratedDocument<AccessToken>;

@Schema({
  collection: 'access-tokens',
})
export class AccessToken {
  @Prop({ required: true })
  token: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  userId: User;

  @Prop({ required: true })
  createdAt: Date;
}

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
