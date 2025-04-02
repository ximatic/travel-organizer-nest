import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './controllers/user.controller';

import { UserService } from './service/user.service';
import { UserProfileService } from './service/user-profile.service';
import { UserSettingsService } from './service/user-settings.service';

import { User, UserSchema } from './schema/user.schema';
import { UserProfile, UserProfileSchema } from './schema/user-profile.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from './schema/user-settings.schema';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    // 3rd party imports
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProfile.name, schema: UserProfileSchema },
      { name: UserSettings.name, schema: UserSettingsSchema },
    ]),
    // local imports
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProfileService, UserSettingsService],
  exports: [UserService],
})
export class UsersModule {}
