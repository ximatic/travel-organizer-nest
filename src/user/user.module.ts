import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './controllers/user.controller';

import { UserService } from './services/user.service';
import { UserProfileService } from './services/user-profile.service';
import { UserSettingsService } from './services/user-settings.service';

import { User, UserSchema } from './schemas/user.schema';
import { UserProfile, UserProfileSchema } from './schemas/user-profile.schema';
import {
  UserSettings,
  UserSettingsSchema,
} from './schemas/user-settings.schema';
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
export class UserModule {}
