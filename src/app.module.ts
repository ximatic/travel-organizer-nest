import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { SettingsModule } from './settings/settings.module';
import { TripsModule } from './trips/trips.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 3rd party imports
    MongooseModule.forRoot('mongodb://localhost:27017/travel-organizer'),
    // local imports
    SettingsModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
