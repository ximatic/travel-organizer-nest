import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from '../model/user-settings.enum';

export const DEFAULT_USER_LANGUAGE = UserSettingsLanguage.English;
export const DEFAULT_USER_DATE_FORMAT = UserSettingsDateFormat.DMY;
export const DEFAULT_USER_TIME_FORMAT = UserSettingsTimeFormat.H24;
export const DEFAULT_USER_THEME = UserSettingsTheme.Light;

export const DEFAULT_USER_SETTINGS = {
  language: DEFAULT_USER_LANGUAGE,
  dateFormat: DEFAULT_USER_DATE_FORMAT,
  timeFormat: DEFAULT_USER_TIME_FORMAT,
  theme: DEFAULT_USER_THEME,
};
