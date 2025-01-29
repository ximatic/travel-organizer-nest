import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './service/users.service';
import { UserProfileService } from './service/user-profile.service';
import { UserSettingsService } from './service/user-settings.service';

import { User, UserSchema } from './schema/user.schema';
import { UserProfile, UserProfileSchema } from './schema/user-profile.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from './schema/user-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
      { name: UserSettings.name, schema: UserSettingsSchema },
    ]),
  ],
  providers: [UsersService, UserProfileService, UserSettingsService],
  exports: [UsersService],
})
export class UsersModule {}
