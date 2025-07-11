import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { MOCK_PASSWORD_0 } from '../../../__mocks__/constants/common.constants';

import { PasswordSetupDto } from './password-setup.dto';

describe('PasswordSetupDto', () => {
  it('should throw errors for invalid Password', async () => {
    const payload = {
      password: MOCK_PASSWORD_0,
    };
    const payloadDto = plainToInstance(PasswordSetupDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(
      `Password is not meeting a complexity criteria`,
    );
  });

  it('should throw errors for invalid Password Repeat', async () => {
    const payload = {
      password: MOCK_PASSWORD_0,
    };
    const payloadDto = plainToInstance(PasswordSetupDto, payload);
    const errors = await validate(payloadDto);
    const errorsText = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(errorsText).toContain(
      `Password Repeat is not meeting a complexity criteria`,
    );
  });
});
