import { Types } from 'mongoose';

import { MOCK_USER_1 } from './user.constants';

import { Trip } from '../../trip/schemas/trip.schema';
import { TripItem } from '../../trip/schemas/trip-item.schema';

import { CreateTripDto } from '../../trip/dto/create-trip.dto';
import { UpdateTripDto } from '../../trip/dto/update-trip.dto';
import { CreateTripItemDto } from 'src/trip/dto/create-trip-item.dto';
import { UpdateTripItemDto } from 'src/trip/dto/update-trip-item.dto';

// trip

export const MOCK_TRIP_1: Trip = {
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

export const MOCK_TRIP_2: Trip = {
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

export const MOCK_TRIP_ITEM_1: TripItem = {
  _id: new Types.ObjectId(),
  name: 'Test Trip Item #1',
  checked: false,
  description: 'Test Trip Item #1 - Description',
  type: 'Test Trip Item #1 - Type',
  size: 'Test Trip Item #1 - Size',
  color: 'Test Trip Item #1 - Color',
  createdAt: new Date(1),
  updatedAt: new Date(1),
};

export const MOCK_TRIP_ITEM_2: TripItem = {
  _id: new Types.ObjectId(),
  name: 'Test Trip Item #2',
  checked: true,
  description: 'Test Trip Item #2 - Description',
  type: 'Test Trip Item #2 - Type',
  size: 'Test Trip Item #2 - Size',
  color: 'Test Trip Item #2 - Color',
  createdAt: new Date(1),
  updatedAt: new Date(1),
};

// create trip

export const MOCK_CREATE_TRIP_1: CreateTripDto = {
  name: MOCK_TRIP_1.name,
  description: MOCK_TRIP_1.description,
  location: MOCK_TRIP_1.location,
  type: MOCK_TRIP_1.type,
};

export const MOCK_CREATE_TRIP_2: CreateTripDto = {
  name: MOCK_TRIP_2.name,
  description: MOCK_TRIP_2.description,
  location: MOCK_TRIP_2.location,
  type: MOCK_TRIP_2.type,
};

// update trip

export const MOCK_UPDATE_TRIP_1: UpdateTripDto = {
  name: MOCK_TRIP_1.name,
  description: MOCK_TRIP_1.description,
  location: MOCK_TRIP_1.location,
  type: MOCK_TRIP_1.type,
};

export const MOCK_UPDATE_TRIP_2: CreateTripDto = {
  name: MOCK_TRIP_2.name,
  description: MOCK_TRIP_2.description,
  location: MOCK_TRIP_2.location,
  type: MOCK_TRIP_2.type,
};

// create trip item

export const MOCK_CREATE_TRIP_ITEM_1: CreateTripItemDto = {
  name: MOCK_TRIP_ITEM_1.name,
  description: MOCK_TRIP_ITEM_1.description,
  checked: MOCK_TRIP_ITEM_1.checked,
  type: MOCK_TRIP_ITEM_1.type,
  size: MOCK_TRIP_ITEM_1.size,
  color: MOCK_TRIP_ITEM_1.color,
};

export const MOCK_CREATE_TRIP_ITEM_2: CreateTripItemDto = {
  name: MOCK_TRIP_ITEM_2.name,
  description: MOCK_TRIP_ITEM_2.description,
  checked: MOCK_TRIP_ITEM_2.checked,
  type: MOCK_TRIP_ITEM_2.type,
  size: MOCK_TRIP_ITEM_2.size,
  color: MOCK_TRIP_ITEM_2.color,
};

// update trip item

export const MOCK_UPDATE_TRIP_ITEM_1: UpdateTripItemDto = {
  name: MOCK_TRIP_ITEM_1.name,
  description: MOCK_TRIP_ITEM_1.description,
  checked: MOCK_TRIP_ITEM_1.checked,
  type: MOCK_TRIP_ITEM_1.type,
  size: MOCK_TRIP_ITEM_1.size,
  color: MOCK_TRIP_ITEM_1.color,
};

export const MOCK_UPDATE_TRIP_ITEM_2: CreateTripItemDto = {
  name: MOCK_TRIP_ITEM_2.name,
  description: MOCK_TRIP_ITEM_2.description,
  checked: MOCK_TRIP_ITEM_2.checked,
  type: MOCK_TRIP_ITEM_2.type,
  size: MOCK_TRIP_ITEM_2.size,
  color: MOCK_TRIP_ITEM_2.color,
};
