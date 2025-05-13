import { UserRole } from '../../user/models/user.enum';

export interface AdminUserResponse {
  id: string;
  email: string;
  role: UserRole;
}
