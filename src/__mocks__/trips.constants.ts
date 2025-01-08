import { Types } from 'mongoose';

// trip

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

// trip item

export const DEFAULT_TRIP_ITEM_1 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip Item #1',
  checked: false,
  description: 'Test Trip Item #1 - Description',
  type: 'Test Trip Item #1 - Type',
  size: 'Test Trip Item #1 - Size',
  color: 'Test Trip Item #1 - Color',
};

export const DEFAULT_TRIP_ITEM_2 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip Item #2',
  checked: true,
  description: 'Test Trip Item #2 - Description',
  type: 'Test Trip Item #2 - Type',
  size: 'Test Trip Item #2 - Size',
  color: 'Test Trip Item #2 - Color',
};
