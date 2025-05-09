import { UserProfileResponse } from './user-profile.model';
import { UserSettingsResponse } from './user-settings.model';
import { UserRole } from './user.enum';

export interface UserInfoResponse {
  email: string;
  role: UserRole;
  profile: UserProfileResponse;
  settings: UserSettingsResponse;
}
