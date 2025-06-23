import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { CreateUserProfileDto } from './create-user-profile.dto';

describe('CreateUserProfileDto', () => {
  it('should throw errors for invalid CreateUserProfileDto', async () => {
    const payload = {};
    const payloadDto = plainToInstance(CreateUserProfileDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`firstname must be a string`);
    expect(errorsText).toContain(`firstname should not be empty`);
    expect(errorsText).toContain(`lastname must be a string`);
    expect(errorsText).toContain(`lastname should not be empty`);
    expect(errorsText).toContain(`user must be a string`);
    expect(errorsText).toContain(`user should not be empty`);
  });
});
