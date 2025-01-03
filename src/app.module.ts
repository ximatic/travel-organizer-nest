import { Module } from '@nestjs/common';

import { SettingsModule } from './settings/settings.module';
import { TripsModule } from './trips/trips.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SettingsModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
