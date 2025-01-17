import { Types } from 'mongoose';

import { UserRole } from '../users/model/user.enum';

// user

export const DEFAULT_USER_1 = {
  _id: new Types.ObjectId(),
  email: 'test-1@example.com',
  password: 'P@ssword123',
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_2 = {
  _id: new Types.ObjectId(),
  email: 'test-2@example.com',
  password: 'P@ssword123',
  role: UserRole.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// user profile

export const DEFAULT_USER_PROFILE_1 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #1',
  lastname: 'Test Lastname #1',
  //userId: DEFAULT_USER_1._id,
  userId: DEFAULT_USER_1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_USER_PROFILE_2 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #2',
  lastname: 'Test Lastname #2',
  //userId: DEFAULT_USER_2._id,
  userId: DEFAULT_USER_2,
  createdAt: new Date(),
  updatedAt: new Date(),
};
