import { SettingsDto } from './settings.dto';

export enum SettingsLanguage {
  English = 'en',
  Polish = 'pl',
}

export enum SettingsDateFormat {
  YMD = 'dd.MM.yyyy',
  DMY = 'yyyy.MM.dd',
}

export enum SettingsTimeFormat {
  H12 = '12h',
  H24 = '24h',
}

export enum SettingsTheme {
  Light = 'light',
  Dark = 'dark',
}

export class Settings {
  language: SettingsLanguage;
  dateFormat: SettingsDateFormat;
  timeFormat: SettingsTimeFormat;
  theme: SettingsTheme;

  constructor(data: Settings | SettingsDto) {
    this.language = data.language as SettingsLanguage;
    this.dateFormat = data.dateFormat as SettingsDateFormat;
    this.timeFormat = data.timeFormat as SettingsTimeFormat;
    this.theme = data.theme as SettingsTheme;
  }
}
