import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { BaseEntity } from '../../common/schemas/base-entity.schema';

import { User } from '../../user/schemas/user.schema';

export type AccessTokenDocument = mongoose.HydratedDocument<AccessToken>;

@Schema({
  collection: 'access-tokens',
})
export class AccessToken extends BaseEntity {
  @Prop({ required: true })
  token: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
