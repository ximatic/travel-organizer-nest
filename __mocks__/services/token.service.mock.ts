export const tokenServiceMock = {
  getAccessToken: jest.fn(),
  getAccessTokenByUserId: jest.fn(),
  createAccessTokenUserId: jest.fn(),
  deleteAccessTokenByUserId: jest.fn(),
  deleteAccessToken: jest.fn(),
  getRefreshTokenByUserId: jest.fn(),
  createRefreshTokenUserId: jest.fn(),
  deleteRefreshTokenByUserId: jest.fn(),
  deleteRefreshToken: jest.fn(),
};
