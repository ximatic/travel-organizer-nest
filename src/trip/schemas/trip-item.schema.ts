import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type TripItemDocument = mongoose.HydratedDocument<TripItem>;

@Schema()
export class TripItem {
  _id: mongoose.Types.ObjectId;

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

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TripItemSchema = SchemaFactory.createForClass(TripItem);
