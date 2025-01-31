import { Types } from 'mongoose';

import { MOCK_USER_1 } from './user.constants';

// access token

export const MOCK_ACCESS_TOKEN_1 = {
  _id: new Types.ObjectId(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg3OWMxM2ZjZDgzNDQ4MzY0MDMzOGYiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzM2OTQxMDkxLCJleHAiOjE3MzY5NDExNTF9.XHeUOqZr6QyEj1D9_Oi_DZYSeWEi17doOqe5yFD1-lk',
  user: MOCK_USER_1._id,
  createdAt: new Date(),
};

// refresh token

export const MOCK_REFRESH_TOKEN_1 = {
  _id: new Types.ObjectId(),
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg3OWMxM2ZjZDgzNDQ4MzY0MDMzOGYiLCJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzM2OTQxMDkxLCJleHAiOjE3MzY5NDExNTF9.XHeUOqZr6QyEj1D9_Oi_DZYSeWEi17doOqe5yFD1-lk',
  user: MOCK_USER_1._id,
  createdAt: new Date(),
};

// token response

export const MOCK_AUTH_TOKEN_1 = {
  accessToken: MOCK_ACCESS_TOKEN_1.token,
};

export const MOCK_AUTH_TOKEN_2 = {
  accessToken: MOCK_ACCESS_TOKEN_1.token,
  refreshToken: MOCK_REFRESH_TOKEN_1.token,
};
