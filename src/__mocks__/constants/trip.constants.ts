import { Types } from 'mongoose';

import { MOCK_USER_1 } from './user.constants';

// trip

export const MOCK_TRIP_1 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip #1',
  description: 'Test Description #1',
  location: 'Test Location #1',
  type: 'Test Type #1',
  startDate: new Date(),
  endDate: new Date(),
  items: [],
  user: MOCK_USER_1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
};

export const MOCK_TRIP_2 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip #2',
  description: 'Test Description #2',
  location: 'Test Location #2',
  type: 'Test Type #2',
  startDate: new Date(),
  endDate: new Date(),
  items: [],
  user: MOCK_USER_1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
};

// trip item

export const MOCK_TRIP_ITEM_1 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip Item #1',
  checked: false,
  description: 'Test Trip Item #1 - Description',
  type: 'Test Trip Item #1 - Type',
  size: 'Test Trip Item #1 - Size',
  color: 'Test Trip Item #1 - Color',
  user: MOCK_USER_1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
};

export const MOCK_TRIP_ITEM_2 = {
  _id: new Types.ObjectId(),
  name: 'Test Trip Item #2',
  checked: true,
  description: 'Test Trip Item #2 - Description',
  type: 'Test Trip Item #2 - Type',
  size: 'Test Trip Item #2 - Size',
  color: 'Test Trip Item #2 - Color',
  user: MOCK_USER_1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
};
