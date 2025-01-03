import { Injectable } from '@nestjs/common';

import * as uuid from 'uuid';

import { Trip } from '../model/trip.model';
import { TripDto } from '../model/trip.dto';

@Injectable()
export class TripsService {
  // TODO - temp solution, move it to DB
  private trips: Trip[] = [
    {
      id: 'a5f21804-6746-4798-86f6-18b0294ccd00',
      name: 'Test Trip #1',
      location: 'Berlin, Germany',
      description: 'Test description for Test Trip #1 asd',
      endDate: new Date('2024-12-28T23:00:00.000Z'),
      startDate: new Date('2024-12-21T23:00:00.000Z'),
      items: [],
    },
  ];

  getTrips(): Trip[] {
    return this.trips;
  }

  getTrip(id: string): Trip {
    const tripIndex = this.getTripIndex(id);
    let trip: Trip;
    if (tripIndex > -1) {
      trip = this.trips[tripIndex];
    }

    return trip;
  }

  createTrip(trip: TripDto): Trip {
    const newTrip = {
      ...trip,
      id: uuid.v4(),
    };
    this.trips.push(newTrip);

    return newTrip;
  }

  updateTrip(trip: TripDto): Trip {
    const tripIndex = this.getTripIndex(trip.id);
    let updatedTrip: Trip;

    if (tripIndex > -1) {
      updatedTrip = {
        ...trip,
      } as Trip;
      this.trips[tripIndex] = updatedTrip;
    }

    return updatedTrip;
  }

  deleteTrip(id: string): Trip {
    const tripIndex = this.getTripIndex(id);
    let deletedTrip: Trip;

    if (tripIndex > -1) {
      deletedTrip = this.trips.splice(tripIndex, 1)[0];
    }

    return deletedTrip;
  }

  private getTripIndex(id: string): number {
    return this.trips.findIndex((trip: Trip) => trip.id == id);
  }
}
