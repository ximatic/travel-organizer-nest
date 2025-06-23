import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
  MOCK_USER_PROFILE_1,
  MOCK_USER_SETTINGS_1,
} from '../../../__mocks__/constants/user.constants';

import { UpdateUserInfoDto } from './update-user-info.dto';

describe('UpdateUserInfoDto', () => {
  it('should throw errors for invalid UpdateUserInfoDto', async () => {
    const payload = {
      email: 1,
    };
    const payloadDto = plainToInstance(UpdateUserInfoDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`email must be a string`);
  });

  it('should properly convert profile to UpdateUserProfileDto', async () => {
    const payload = {
      profile: {
        firstname: MOCK_USER_PROFILE_1.firstname,
        lastname: MOCK_USER_PROFILE_1.lastname,
      },
    };
    const payloadDto = plainToInstance(UpdateUserInfoDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.profile?.firstname).toEqual(
      MOCK_USER_PROFILE_1.firstname,
    );
    expect(payloadDto.profile?.lastname).toEqual(MOCK_USER_PROFILE_1.lastname);
  });

  it('should properly convert profile to UpdateUserSettingsDto', async () => {
    const payload = {
      settings: {
        language: MOCK_USER_SETTINGS_1.language.toString(),
        dateFormat: MOCK_USER_SETTINGS_1.dateFormat.toString(),
        timeFormat: MOCK_USER_SETTINGS_1.timeFormat.toString(),
        theme: MOCK_USER_SETTINGS_1.theme.toString(),
      },
    };
    const payloadDto = plainToInstance(UpdateUserInfoDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.settings?.language).toEqual(
      MOCK_USER_SETTINGS_1.language,
    );
    expect(payloadDto.settings?.dateFormat).toEqual(
      MOCK_USER_SETTINGS_1.dateFormat,
    );
    expect(payloadDto.settings?.timeFormat).toEqual(
      MOCK_USER_SETTINGS_1.timeFormat,
    );
    expect(payloadDto.settings?.theme).toEqual(MOCK_USER_SETTINGS_1.theme);
  });
});
