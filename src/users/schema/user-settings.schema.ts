import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from './user.schema';
import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../model/user-settings.enum';

export type UserSettingsDocument = mongoose.HydratedDocument<UserSettings>;

@Schema({
  collection: 'user-settings',
})
export class UserSettings {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  language: UserSettingsLanguage;

  @Prop({ required: true })
  dateFormat: UserSettingsDateFormat;

  @Prop({ required: true })
  timeFormat: UserSettingsTimeFormat;

  @Prop({ required: true })
  theme: UserSettingsTheme;

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
