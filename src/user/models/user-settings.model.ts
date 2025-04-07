import {
  UserSettingsLanguage,
  UserSettingsDateFormat,
  UserSettingsTimeFormat,
  UserSettingsTheme,
} from './user-settings.enum';

export interface UserSettingsResponse {
  language: UserSettingsLanguage;
  dateFormat: UserSettingsDateFormat;
  timeFormat: UserSettingsTimeFormat;
  theme: UserSettingsTheme;
}
