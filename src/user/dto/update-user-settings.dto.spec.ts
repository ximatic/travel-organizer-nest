import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
  MOCK_USER_1,
  MOCK_USER_SETTINGS_1,
} from '../../../__mocks__/constants/user.constants';

import { UpdateUserSettingsDto } from './update-user-settings.dto';

describe('UpdateUserSettingsDto', () => {
  it('should properly convert language to UserSettingsLanguage', async () => {
    const payload = {
      language: MOCK_USER_SETTINGS_1.language.toString(),
      user: MOCK_USER_1._id.toString(),
    };
    const payloadDto = plainToInstance(UpdateUserSettingsDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.language).toEqual(MOCK_USER_SETTINGS_1.language);
  });

  it('should properly convert dateFormat to UserSettingsDateFormat', async () => {
    const payload = {
      dateFormat: MOCK_USER_SETTINGS_1.dateFormat.toString(),
      user: MOCK_USER_1._id.toString(),
    };
    const payloadDto = plainToInstance(UpdateUserSettingsDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.dateFormat).toEqual(MOCK_USER_SETTINGS_1.dateFormat);
  });

  it('should properly convert dateFormat to UserSettingsTimeFormat', async () => {
    const payload = {
      timeFormat: MOCK_USER_SETTINGS_1.timeFormat.toString(),
      user: MOCK_USER_1._id.toString(),
    };
    const payloadDto = plainToInstance(UpdateUserSettingsDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.timeFormat).toEqual(MOCK_USER_SETTINGS_1.timeFormat);
  });

  it('should properly convert dateFormat to UserSettingsTheme', async () => {
    const payload = {
      theme: MOCK_USER_SETTINGS_1.theme.toString(),
      user: MOCK_USER_1._id.toString(),
    };
    const payloadDto = plainToInstance(UpdateUserSettingsDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.theme).toEqual(MOCK_USER_SETTINGS_1.theme);
  });
});
