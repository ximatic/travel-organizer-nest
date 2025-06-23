import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { UpdateUserProfileDto } from './update-user-profile.dto';

describe('UpdateUserDto', () => {
  it('should throw errors for invalid UpdateUserProfileDto', async () => {
    const payload = {
      firstname: 1,
      lastname: 2,
    };
    const payloadDto = plainToInstance(UpdateUserProfileDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`firstname must be a string`);
    expect(errorsText).toContain(`lastname must be a string`);
  });
});
