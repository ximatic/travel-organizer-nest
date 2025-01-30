import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from './user-settings.enum';

export interface UserSettingsResponse {
  language: SettingsLanguage;
  dateFormat: SettingsDateFormat;
  timeFormat: SettingsTimeFormat;
  theme: SettingsTheme;
}
