import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type TripItemDocument = HydratedDocument<TripItem>;

@Schema()
export class TripItem {
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
