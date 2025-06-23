import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { MOCK_ROLE_1 } from '../../../__mocks__/constants/common.constants';
import { MOCK_USER_1 } from '../../../__mocks__/constants/user.constants';

import { UpdateAdminUserDto } from './update-admin-user.dto';

describe('UpdateAdminUserDto', () => {
  it('should throw errors for invalid UpdateAdminUserDto', async () => {
    const payload = {};
    const payloadDto = plainToInstance(UpdateAdminUserDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(`id must be a string`);
    expect(errorsText).toContain(`id should not be empty`);
  });

  it('should properly convert user to UserRole', async () => {
    const payload = {
      id: MOCK_USER_1._id.toString(),
      role: 'user',
    };
    const payloadDto = plainToInstance(UpdateAdminUserDto, payload);
    const errors = await validate(payloadDto);

    expect(errors.length).toBe(0);
    expect(payloadDto.role).toEqual(MOCK_ROLE_1);
  });
});
