import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { BaseEntity } from '../../common/schemas/base-entity.schema';

import { User } from '../../user/schemas/user.schema';

import { TripItem, TripItemSchema } from './trip-item.schema';

export type TripDocument = mongoose.HydratedDocument<Trip>;

@Schema()
export class Trip extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  type: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: [TripItemSchema] })
  items: TripItem[];

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
