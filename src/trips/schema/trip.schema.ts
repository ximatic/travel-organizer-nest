import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { TripItem } from './trip-item.schema';

export type TripDocument = mongoose.HydratedDocument<Trip>;

@Schema()
export class Trip {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TripItem' })
  items: TripItem[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
