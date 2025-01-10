import { Types } from 'mongoose';

import { DEFAULT_SETTINGS } from '../settings/constants/settings.constants';

import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../settings/model/settings.enum';

// settings id

export const DEFAULT_SETTINGS_ID_1 = new Types.ObjectId();

// settings

export const DEFAULT_SETTINGS_0 = {
  ...DEFAULT_SETTINGS,
};

export const DEFAULT_SETTINGS_1 = {
  _id: DEFAULT_SETTINGS_ID_1,
  ...DEFAULT_SETTINGS,
};

export const DEFAULT_SETTINGS_2 = {
  _id: new Types.ObjectId(),
  language: SettingsLanguage.English,
  dateFormat: SettingsDateFormat.DMY,
  timeFormat: SettingsTimeFormat.H24,
  theme: SettingsTheme.Dark,
};
