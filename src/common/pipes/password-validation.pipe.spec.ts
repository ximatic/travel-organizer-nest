import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  MOCK_PASSWORD_1,
  MOCK_PASSWORD_2,
} from '../../../__mocks__/constants/common.constants';

import { PasswordSetupDto } from '../dto/password-setup.dto';

import { PasswordValidationPipe } from './password-validation.pipe';

describe('PasswordValidationPipe', () => {
  let pipe: PasswordValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordValidationPipe],
    }).compile();

    pipe = module.get<PasswordValidationPipe>(PasswordValidationPipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform()', () => {
    it('should throw an BadRequestException passwords are not the same', () => {
      const passwordSetupDto: PasswordSetupDto = {
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_2,
      };

      let hasThrown = false;
      try {
        pipe.transform(passwordSetupDto);
      } catch (error: any) {
        hasThrown = true;
        expect(error).toBeInstanceOf(BadRequestException);
      }

      expect(hasThrown).toBe(true);
    });

    it('should return value are exactly the same', () => {
      const passwordSetupDto: PasswordSetupDto = {
        password: MOCK_PASSWORD_1,
        passwordRepeat: MOCK_PASSWORD_1,
      };

      let result;
      let hasThrown = false;
      try {
        result = pipe.transform(passwordSetupDto);
      } catch {
        hasThrown = true;
      }

      expect(hasThrown).toBe(false);
      expect(result).toBe(passwordSetupDto);
    });
  });
});
