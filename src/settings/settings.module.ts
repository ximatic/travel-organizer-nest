import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { SettingsController } from './controller/settings.controller';
import { SettingsService } from './service/settings.service';

import { Settings, SettingsSchema } from './schema/settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
