import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  private static saltOrRounds: number = 10;

  public static isValidPassword(
    password: string,
    passwordRepeat: string,
  ): boolean {
    // TODO - add extra logic for password requirements
    return password === passwordRepeat;
  }

  public static passwordsMatch(
    passwordA: string,
    passwordB: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordA, passwordB);
  }

  public static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, PasswordHelper.saltOrRounds);
  }
}
