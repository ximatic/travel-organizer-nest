import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { CreateUserProfileDto } from '../../src/user/dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../../src/user/dto/update-user-profile.dto';
import { CreateUserSettingsDto } from '../../src/user/dto/create-user-settings.dto';
import { UpdateUserSettingsDto } from '../../src/user/dto/update-user-settings.dto';

import {
  MOCK_USER_PROFILE_1,
  MOCK_USER_1,
  MOCK_USER_PROFILE_2,
  MOCK_USER_2,
  MOCK_USER_SETTINGS_1,
  MOCK_USER_SETTINGS_2,
} from '../constants/user.constants';

// user

// create user

export const MOCK_CREATE_USER_1: CreateUserDto = {
  email: MOCK_USER_1.email,
  password: MOCK_USER_1.password,
};

export const MOCK_CREATE_USER_2: CreateUserDto = {
  email: MOCK_USER_2.email,
  password: MOCK_USER_2.password,
};

// user profile

// create user profile

export const MOCK_CREATE_USER_PROFILE_1: CreateUserProfileDto = {
  firstname: MOCK_USER_PROFILE_1.firstname,
  lastname: MOCK_USER_PROFILE_1.lastname,
  user: MOCK_USER_1._id,
};

export const MOCK_CREATE_USER_PROFILE_2: CreateUserProfileDto = {
  firstname: MOCK_USER_PROFILE_2.firstname,
  lastname: MOCK_USER_PROFILE_2.lastname,
  user: MOCK_USER_2._id,
};

// update user profile

export const MOCK_UPDATE_USER_PROFILE_1: UpdateUserProfileDto = {
  firstname: MOCK_USER_PROFILE_1.firstname,
  lastname: MOCK_USER_PROFILE_1.lastname,
};

export const MOCK_UPDATE_USER_PROFILE_2: UpdateUserProfileDto = {
  firstname: MOCK_USER_PROFILE_2.firstname,
  lastname: MOCK_USER_PROFILE_2.lastname,
};

// user settings

// update user settings

export const MOCK_CREATE_USER_SETTINGS_1: CreateUserSettingsDto = {
  language: MOCK_USER_SETTINGS_1.language,
  dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
  theme: MOCK_USER_SETTINGS_1.theme,
  user: MOCK_USER_1._id,
};

export const MOCK_CREATE_USER_SETTINGS_2: CreateUserSettingsDto = {
  language: MOCK_USER_SETTINGS_2.language,
  dateFormat: MOCK_USER_SETTINGS_2.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_2.timeFormat,
  theme: MOCK_USER_SETTINGS_2.theme,
  user: MOCK_USER_2._id,
};

// update user settings

export const MOCK_UPDATE_USER_SETTINGS_1: UpdateUserSettingsDto = {
  language: MOCK_USER_SETTINGS_1.language,
  dateFormat: MOCK_USER_SETTINGS_1.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_1.timeFormat,
  theme: MOCK_USER_SETTINGS_1.theme,
};

export const MOCK_UPDATE_USER_SETTINGS_2: UpdateUserSettingsDto = {
  language: MOCK_USER_SETTINGS_2.language,
  dateFormat: MOCK_USER_SETTINGS_2.dateFormat,
  timeFormat: MOCK_USER_SETTINGS_2.timeFormat,
  theme: MOCK_USER_SETTINGS_2.theme,
};
