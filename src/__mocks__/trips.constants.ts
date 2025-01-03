import { Types } from 'mongoose';

export const DEFAULT_TRIP_1 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip #1',
  description: 'Test Description #1',
  location: 'Test Location #1',
  type: 'Test Type #1',
  startDate: new Date(),
  endDate: new Date(),
  items: [],
};

export const DEFAULT_TRIP_2 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip #2',
  description: 'Test Description #2',
  location: 'Test Location #2',
  type: 'Test Type #2',
  startDate: new Date(),
  endDate: new Date(),
  items: [],
};
