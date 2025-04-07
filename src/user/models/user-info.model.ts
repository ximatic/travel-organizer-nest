import { UserProfileResponse } from './user-profile.model';
import { UserSettingsResponse } from './user-settings.model';

export interface UserInfoResponse {
  email: string;
  profile: UserProfileResponse;
  settings: UserSettingsResponse;
}
