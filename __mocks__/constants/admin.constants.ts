import { MOCK_USER_1, MOCK_USER_2 } from './user.constants';

import { AdminUserResponse } from '../../src/admin/models/admin-user.model';

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
