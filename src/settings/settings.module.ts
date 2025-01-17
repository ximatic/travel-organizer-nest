import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { SettingsController } from './controller/settings.controller';
import { SettingsService } from './service/settings.service';

import { Settings, SettingsSchema } from './schema/settings.schema';

@Module({
  imports: [
    // 3rd party modules
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
    // internal modules
    AuthModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
