import { Types } from 'mongoose';

import { UserRole } from '../users/model/user.enum';
import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../settings/model/settings.enum';

// user

export const DEFAULT_USER_1 = {
  _id: new Types.ObjectId(),
  email: 'test-1@example.com',
  password: 'P@ssword123',
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_2 = {
  _id: new Types.ObjectId(),
  email: 'test-2@example.com',
  password: 'P@ssword123',
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// user profile

export const DEFAULT_USER_PROFILE_1 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #1',
  lastname: 'Test Lastname #1',
  user: DEFAULT_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_PROFILE_2 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #2',
  lastname: 'Test Lastname #2',
  user: DEFAULT_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_PROFILE_RESPONSE_1 = {
  firstname: DEFAULT_USER_PROFILE_1.firstname,
  lastname: DEFAULT_USER_PROFILE_1.lastname,
};

export const DEFAULT_USER_PROFILE_RESPONSE_2 = {
  firstname: DEFAULT_USER_PROFILE_2.firstname,
  lastname: DEFAULT_USER_PROFILE_2.lastname,
};

// user settings

export const DEFAULT_USER_SETTINGS_1 = {
  _id: new Types.ObjectId(),
  language: SettingsLanguage.English,
  dateFormat: SettingsDateFormat.DMY,
  timeFormat: SettingsTimeFormat.H24,
  theme: SettingsTheme.Light,
  user: DEFAULT_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_SETTINGS_2 = {
  _id: new Types.ObjectId(),
  language: SettingsLanguage.English,
  dateFormat: SettingsDateFormat.DMY,
  timeFormat: SettingsTimeFormat.H12,
  theme: SettingsTheme.Dark,
  user: DEFAULT_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_SETTINGS_RESPONSE_1 = {
  language: DEFAULT_USER_SETTINGS_1.language,
  dateFormat: DEFAULT_USER_SETTINGS_1.dateFormat,
  timeFormat: DEFAULT_USER_SETTINGS_1.timeFormat,
  theme: DEFAULT_USER_SETTINGS_1.theme,
};

export const DEFAULT_USER_SETTINGS_RESPONSE_2 = {
  language: DEFAULT_USER_SETTINGS_2.language,
  dateFormat: DEFAULT_USER_SETTINGS_2.dateFormat,
  timeFormat: DEFAULT_USER_SETTINGS_2.timeFormat,
  theme: DEFAULT_USER_SETTINGS_2.theme,
};
