import { Module } from '@nestjs/common';

import { SettingsController } from './controller/settings.controller';
import { SettingsService } from './service/settings.service';

@Module({
  imports: [],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
