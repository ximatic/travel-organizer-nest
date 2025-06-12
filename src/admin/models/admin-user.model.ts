import { UserRole } from '../../user/models/user.enum';

export interface AdminUserResponse {
  id: string;
  email: string;
  role: UserRole;
}

export interface AdminUserProfileResponse extends AdminUserResponse {
  firstname: string;
  lastname: string;
}
