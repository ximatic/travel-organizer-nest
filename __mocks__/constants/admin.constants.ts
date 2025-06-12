import {
  MOCK_USER_1,
  MOCK_USER_2,
  MOCK_USER_PROFILE_1,
  MOCK_USER_PROFILE_2,
} from './user.constants';

import {
  AdminUserProfileResponse,
  AdminUserResponse,
} from '../../src/admin/models/admin-user.model';

// admin user response

export const MOCK_ADMIN_USER_RESPONSE_1: AdminUserResponse = {
  id: MOCK_USER_1._id.toString(),
  email: MOCK_USER_1.email,
  role: MOCK_USER_1.role,
};

export const MOCK_ADMIN_USER_RESPONSE_2: AdminUserResponse = {
  id: MOCK_USER_2._id.toString(),
  email: MOCK_USER_2.email,
  role: MOCK_USER_2.role,
};

// admin user profile response

export const MOCK_ADMIN_USER_PROFILE_RESPONSE_1: AdminUserProfileResponse = {
  ...MOCK_ADMIN_USER_RESPONSE_1,
  firstname: MOCK_USER_PROFILE_1.firstname,
  lastname: MOCK_USER_PROFILE_1.lastname,
};

export const MOCK_ADMIN_USER_PROFILE_RESPONSE_2: AdminUserProfileResponse = {
  ...MOCK_ADMIN_USER_RESPONSE_2,
  firstname: MOCK_USER_PROFILE_2.firstname,
  lastname: MOCK_USER_PROFILE_2.lastname,
};
