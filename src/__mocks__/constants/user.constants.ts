import { Types } from 'mongoose';

import { UserRole } from '../../users/model/user.enum';
import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../../users/model/user-settings.enum';

// user

export const MOCK_USER_1 = {
  _id: new Types.ObjectId(),
  email: 'test-1@example.com',
  password: 'P@ssword123',
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_2 = {
  _id: new Types.ObjectId(),
  email: 'test-2@example.com',
  password: 'P@ssword123',
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// user profile

export const MOCK_USER_PROFILE_1 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #1',
  lastname: 'Test Lastname #1',
  user: MOCK_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_PROFILE_2 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #2',
  lastname: 'Test Lastname #2',
  user: MOCK_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_PROFILE_RESPONSE_1 = {
  firstname: MOCK_USER_PROFILE_1.firstname,
  lastname: MOCK_USER_PROFILE_1.lastname,
};

export const MOCK_USER_PROFILE_RESPONSE_2 = {
  firstname: MOCK_USER_PROFILE_2.firstname,
  lastname: MOCK_USER_PROFILE_2.lastname,
};

// user settings

export const MOCK_USER_SETTINGS_1 = {
  _id: new Types.ObjectId(),
  language: SettingsLanguage.English,
  dateFormat: SettingsDateFormat.DMY,
  timeFormat: SettingsTimeFormat.H24,
  theme: SettingsTheme.Light,
  user: MOCK_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_SETTINGS_2 = {
  _id: new Types.ObjectId(),
  language: SettingsLanguage.English,
  dateFormat: SettingsDateFormat.DMY,
  timeFormat: SettingsTimeFormat.H12,
  theme: SettingsTheme.Dark,
  user: MOCK_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_SETTINGS_RESPONSE_1 = {
  language: MOCK_USER_SETTINGS_1.language,
  dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
  theme: MOCK_USER_SETTINGS_1.theme,
};

export const MOCK_USER_SETTINGS_RESPONSE_2 = {
  language: MOCK_USER_SETTINGS_2.language,
  dateFormat: MOCK_USER_SETTINGS_2.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_2.timeFormat,
  theme: MOCK_USER_SETTINGS_2.theme,
};
