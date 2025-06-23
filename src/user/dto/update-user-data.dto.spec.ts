import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { MOCK_USER_PROFILE_1 } from '../../../__mocks__/constants/user.constants';

import { UpdateUserDataDto } from './update-user-data.dto';

describe('UpdateUserDataDto', () => {
  it('should throw errors for invalid UpdateUserDataDto', async () => {
    const payload = {
      email: 1,
    };
    const payloadDto = plainToInstance(UpdateUserDataDto, payload);
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
    const payloadDto = plainToInstance(UpdateUserDataDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.profile?.firstname).toEqual(
      MOCK_USER_PROFILE_1.firstname,
    );
    expect(payloadDto.profile?.lastname).toEqual(MOCK_USER_PROFILE_1.lastname);
  });
});
