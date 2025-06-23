import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { UpdateUserPasswordDto } from './update-user-password.dto';

describe('UpdateUserPasswordDto', () => {
  it('should throw errors for invalid UpdateUserPasswordDto', async () => {
    const payload = {};
    const payloadDto = plainToInstance(UpdateUserPasswordDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`password must be a string`);
    expect(errorsText).toContain(`password should not be empty`);
    expect(errorsText).toContain(`passwordRepeat must be a string`);
    expect(errorsText).toContain(`passwordRepeat should not be empty`);
    expect(errorsText).toContain(`currentPassword must be a string`);
    expect(errorsText).toContain(`currentPassword should not be empty`);
  });
});
