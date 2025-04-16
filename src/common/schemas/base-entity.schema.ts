import { Prop, Schema } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

@Schema()
export class BaseEntity {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}
