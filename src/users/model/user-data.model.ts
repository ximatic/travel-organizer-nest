import { UserProfile } from '../schema/user-profile.schema';

export interface UserDataResponse {
  email: string;
  profile: UserProfile;
}
