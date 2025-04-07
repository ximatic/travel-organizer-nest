import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { PasswordHelper } from '../helpers/pasword.helper';

import { PasswordSetupDto } from '../dto/password-setup.dto';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: PasswordSetupDto): any {
    if (!PasswordHelper.isValidPassword(value.password, value.passwordRepeat)) {
      throw new BadRequestException(
        `Provided passwords are not the same. Please try again later.`,
      );
    }

    return value;
  }
}
