import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from '../../users/schema/user.schema';

export type RefreshTokenDocument = mongoose.HydratedDocument<RefreshToken>;

@Schema({
  collection: 'refresh-tokens',
})
export class RefreshToken {
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

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
