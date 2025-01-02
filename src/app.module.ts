import { Module } from '@nestjs/common';

import { SettingsModule } from './settings/settings.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
