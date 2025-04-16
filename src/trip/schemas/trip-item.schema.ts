import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { BaseEntity } from '../../common/schemas/base-entity.schema';

export type TripItemDocument = mongoose.HydratedDocument<TripItem>;

@Schema()
export class TripItem extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  checked: boolean;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  size: string;

  @Prop()
  color: string;
}

export const TripItemSchema = SchemaFactory.createForClass(TripItem);
