import { UserProfileResponse } from './user-profile.model';

export interface UserDataResponse {
  email: string;
  profile: UserProfileResponse;
}
