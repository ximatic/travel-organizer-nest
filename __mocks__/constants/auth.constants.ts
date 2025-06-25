import { Types } from 'mongoose';

import { MOCK_USER_1, MOCK_USER_2 } from './user.constants';

import { AccessToken } from '../../src/token/schemas/access-token.schema';
import { RefreshToken } from '../../src/token/schemas/refresh-token.schema';

// access token

// token with user role
export const MOCK_ACCESS_TOKEN_1: AccessToken = {
  _id: new Types.ObjectId(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg3OWMxM2ZjZDgzNDQ4MzY0MDMzOGYiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzM2OTQxMDkxLCJleHAiOjE3MzY5NDExNTF9.XHeUOqZr6QyEj1D9_Oi_DZYSeWEi17doOqe5yFD1-lk',
  user: MOCK_USER_1,
  createdAt: new Date(),
};

// token with admin role
export const MOCK_ACCESS_TOKEN_2: AccessToken = {
  _id: new Types.ObjectId(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg3OWMxM2ZjZDgzNDQ4MzY0MDMzOGYiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzM2OTQxMDkxLCJleHAiOjE3MzY5NDExNTF9.XHeUOqZr6QyEj1D9_Oi_DZYSeWEi17doOqe5yFD1-lk',
  user: MOCK_USER_2,
  createdAt: new Date(),
};

// refresh token

export const MOCK_REFRESH_TOKEN_1: RefreshToken = {
  _id: new Types.ObjectId(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg3OWMxM2ZjZDgzNDQ4MzY0MDMzOGYiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzM2OTQxMDkxLCJleHAiOjE3MzY5NDExNTF9.XHeUOqZr6QyEj1D9_Oi_DZYSeWEi17doOqe5yFD1-lk',
  user: MOCK_USER_1,
  createdAt: new Date(),
};

export const MOCK_REFRESH_TOKEN_2: RefreshToken = {
  _id: new Types.ObjectId(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg3OWMxM2ZjZDgzNDQ4MzY0MDMzOGYiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzM2OTQxMDkxLCJleHAiOjE3MzY5NDExNTF9.XHeUOqZr6QyEj1D9_Oi_DZYSeWEi17doOqe5yFD1-lk',
  user: MOCK_USER_2,
  createdAt: new Date(),
};

// token response

export const MOCK_AUTH_TOKEN_1 = {
  accessToken: MOCK_ACCESS_TOKEN_1.token,
};

export const MOCK_AUTH_TOKEN_2 = {
  accessToken: MOCK_ACCESS_TOKEN_2.token,
  refreshToken: MOCK_REFRESH_TOKEN_2.token,
};
