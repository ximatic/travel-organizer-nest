import { UserRole } from '../../src/user/models/user.enum';

// user

export const MOCK_EMAIL_1 = 'test-1@example.com';
export const MOCK_EMAIL_2 = 'test-2@example.com';

export const MOCK_PASSWORD_1 = 'P@ssword123';
export const MOCK_PASSWORD_2 = 'P@ssword321';

export const MOCK_PASSWORD_HASH_1 =
  '$2b$10$J7kn4LdwDFJVayZXG9ZLB.PB7ev84Pp67OgOlIzNaLLX2gl.zPneC';
export const MOCK_PASSWORD_HASH_2 =
  '$2b$10$O.cmipo02p9nMx8mWnCg/udP8spXJ4g3CZOfNSNWIHyGIg6AarUbm';

export const MOCK_FIRSTNAME_1 = 'Test Firstname #1';
export const MOCK_FIRSTNAME_2 = 'Test Firstname #2';

export const MOCK_LASTNAME_1 = 'Test Lastname #1';
export const MOCK_LASTNAME_2 = 'Test Lastname #2';

export const MOCK_ROLE_1 = UserRole.User;
export const MOCK_ROLE_2 = UserRole.Admin;
