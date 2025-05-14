import { Types } from 'mongoose';

import { User } from '../../src/user/schemas/user.schema';
import { UserProfile } from '../../src/user/schemas/user-profile.schema';
import { UserSettings } from '../../src/user/schemas/user-settings.schema';

import { UserDataResponse } from '../../src/user/models/user-data.model';
import { UserInfoResponse } from '../../src/user/models/user-info.model';
import { UserProfileResponse } from '../../src/user/models/user-profile.model';
import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../../src/user/models/user-settings.enum';
import { UserSettingsResponse } from '../../src/user/models/user-settings.model';

import {
  MOCK_EMAIL_1,
  MOCK_EMAIL_2,
  MOCK_FIRSTNAME_1,
  MOCK_FIRSTNAME_2,
  MOCK_LASTNAME_1,
  MOCK_LASTNAME_2,
  MOCK_PASSWORD_HASH_1,
  MOCK_PASSWORD_HASH_2,
  MOCK_ROLE_1,
  MOCK_ROLE_2,
} from './common.constants';

// user

export const MOCK_USER_1: User = {
  _id: new Types.ObjectId(),
  email: MOCK_EMAIL_1,
  password: MOCK_PASSWORD_HASH_1, //'$2b$10$J7kn4LdwDFJVayZXG9ZLB.PB7ev84Pp67OgOlIzNaLLX2gl.zPneC', // MOCK_PASSWORD_1
  role: MOCK_ROLE_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_2: User = {
  _id: new Types.ObjectId(),
  email: MOCK_EMAIL_2,
  password: MOCK_PASSWORD_HASH_2, //'$2b$10$O.cmipo02p9nMx8mWnCg/udP8spXJ4g3CZOfNSNWIHyGIg6AarUbm', // MOCK_PASSWORD_2
  role: MOCK_ROLE_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// user profile

export const MOCK_USER_PROFILE_1: UserProfile = {
  _id: new Types.ObjectId(),
  firstname: MOCK_FIRSTNAME_1,
  lastname: MOCK_LASTNAME_1,
  user: MOCK_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_PROFILE_2: UserProfile = {
  _id: new Types.ObjectId(),
  firstname: MOCK_FIRSTNAME_2,
  lastname: MOCK_LASTNAME_2,
  user: MOCK_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_PROFILE_RESPONSE_1: UserProfileResponse = {
  firstname: MOCK_USER_PROFILE_1.firstname,
  lastname: MOCK_USER_PROFILE_1.lastname,
};

export const MOCK_USER_PROFILE_RESPONSE_2: UserProfileResponse = {
  firstname: MOCK_USER_PROFILE_2.firstname,
  lastname: MOCK_USER_PROFILE_2.lastname,
};

// user settings

export const MOCK_USER_SETTINGS_1: UserSettings = {
  _id: new Types.ObjectId(),
  language: UserSettingsLanguage.English,
  dateFormat: UserSettingsDateFormat.DMY,
  timeFormat: UserSettingsTimeFormat.H24,
  theme: UserSettingsTheme.Light,
  user: MOCK_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_SETTINGS_2: UserSettings = {
  _id: new Types.ObjectId(),
  language: UserSettingsLanguage.English,
  dateFormat: UserSettingsDateFormat.DMY,
  timeFormat: UserSettingsTimeFormat.H12,
  theme: UserSettingsTheme.Dark,
  user: MOCK_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_USER_SETTINGS_RESPONSE_1: UserSettingsResponse = {
  language: MOCK_USER_SETTINGS_1.language,
  dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
  theme: MOCK_USER_SETTINGS_1.theme,
};

export const MOCK_USER_SETTINGS_RESPONSE_2: UserSettingsResponse = {
  language: MOCK_USER_SETTINGS_2.language,
  dateFormat: MOCK_USER_SETTINGS_2.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_2.timeFormat,
  theme: MOCK_USER_SETTINGS_2.theme,
};

// user info

export const MOCK_USER_INFO_RESPONSE_1: UserInfoResponse = {
  email: MOCK_USER_1.email,
  role: MOCK_USER_1.role,
  profile: MOCK_USER_PROFILE_RESPONSE_1,
  settings: MOCK_USER_SETTINGS_RESPONSE_1,
};

export const MOCK_USER_INFO_RESPONSE_2: UserInfoResponse = {
  email: MOCK_USER_2.email,
  role: MOCK_USER_2.role,
  profile: MOCK_USER_PROFILE_RESPONSE_2,
  settings: MOCK_USER_SETTINGS_RESPONSE_2,
};

// user data

export const MOCK_USER_DATA_RESPONSE_1: UserDataResponse = {
  email: MOCK_USER_1.email,
  profile: MOCK_USER_PROFILE_RESPONSE_1,
};

export const MOCK_USER_DATA_RESPONSE_2: UserDataResponse = {
  email: MOCK_USER_2.email,
  profile: MOCK_USER_PROFILE_RESPONSE_2,
};
