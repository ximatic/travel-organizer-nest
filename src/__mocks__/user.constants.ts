import { Types } from 'mongoose';

// user

export const DEFAULT_USER_1 = {
  _id: new Types.ObjectId(),
  email: 'test-1@example.com',
  password: 'P@ssword123',
  createdAt: new Date(),
};

export const DEFAULT_USER_2 = {
  _id: new Types.ObjectId(),
  email: 'test-2@example.com',
  password: 'P@ssword123',
  createdAt: new Date(),
};

// user profile

export const DEFAULT_USER_PROFILE_1 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #1',
  lastname: 'Test Lastname #1',
  userId: DEFAULT_USER_1._id,
  createdAt: new Date(),
};

export const DEFAULT_USER_PROFILE_2 = {
  _id: new Types.ObjectId(),
  firstname: 'Test Firstname #2',
  lastname: 'Test Lastname #2',
  userId: DEFAULT_USER_2._id,
  createdAt: new Date(),
};
