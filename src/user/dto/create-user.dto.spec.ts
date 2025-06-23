import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
  MOCK_EMAIL_1,
  MOCK_PASSWORD_1,
  MOCK_ROLE_1,
} from '../../../__mocks__/constants/common.constants';

import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should throw errors for invalid CreateUserDto', async () => {
    const payload = {};
    const payloadDto = plainToInstance(CreateUserDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`email must be a string`);
    expect(errorsText).toContain(`email should not be empty`);
    expect(errorsText).toContain(`password must be a string`);
    expect(errorsText).toContain(`password should not be empty`);
  });

  it('should properly convert role to MOCK_ROLE_1', async () => {
    const payload = {
      email: MOCK_EMAIL_1,
      password: MOCK_PASSWORD_1,
      role: MOCK_ROLE_1.toString(),
    };
    const payloadDto = plainToInstance(CreateUserDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.role).toEqual(MOCK_ROLE_1);
  });
});
