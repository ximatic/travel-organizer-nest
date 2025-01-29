import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { User } from './user.schema';
import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../../settings/model/settings.enum';

export type UserSettingsDocument = mongoose.HydratedDocument<UserSettings>;

@Schema({
  collection: 'user-settings',
})
export class UserSettings {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  language: SettingsLanguage;

  @Prop({ required: true })
  dateFormat: SettingsDateFormat;

  @Prop({ required: true })
  timeFormat: SettingsTimeFormat;

  @Prop({ required: true })
  theme: SettingsTheme;

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
