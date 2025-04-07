import { UserProfile } from '../schemas/user-profile.schema';

export interface UserDataResponse {
  email: string;
  profile: UserProfile;
}
