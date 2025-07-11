import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
  MOCK_EMAIL_1,
  MOCK_PASSWORD_0,
  MOCK_PASSWORD_1,
  MOCK_ROLE_1,
} from '../../../__mocks__/constants/common.constants';

import { CreateAdminUserDto } from './create-admin-user.dto';

describe('CreateAdminUserDto', () => {
  it('should throw errors for an empty CreateAdminUserDto', async () => {
    const payload = {};
    const payloadDto = plainToInstance(CreateAdminUserDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`email should not be empty`);
    expect(errorsText).toContain(`password must be a string`);
    expect(errorsText).toContain(`password should not be empty`);
  });

  it('should throw errors for invalid Password', async () => {
    const payload = {
      email: MOCK_EMAIL_1,
      password: MOCK_PASSWORD_0,
      role: 'user',
    };
    const payloadDto = plainToInstance(CreateAdminUserDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(
      `Password is not meeting a complexity criteria`,
    );
  });

  it('should properly convert user to UserRole', async () => {
    const payload = {
      email: MOCK_EMAIL_1,
      password: MOCK_PASSWORD_1,
      role: 'user',
    };
    const payloadDto = plainToInstance(CreateAdminUserDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.role).toEqual(MOCK_ROLE_1);
  });
});
