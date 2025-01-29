import {
  SettingsLanguage,
  SettingsDateFormat,
  SettingsTimeFormat,
  SettingsTheme,
} from '../../settings/model/settings.enum';

export interface UserSettingsResponse {
  language: SettingsLanguage;
  dateFormat: SettingsDateFormat;
  timeFormat: SettingsTimeFormat;
  theme: SettingsTheme;
}
