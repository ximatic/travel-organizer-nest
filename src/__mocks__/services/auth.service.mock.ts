export const authServiceMock = {
  login: jest.fn(),
  logout: jest.fn(),
  verifyToken: jest.fn(),
  refreshToken: jest.fn(),
  signup: jest.fn(),
  updateUser: jest.fn(),
  getUserInfo: jest.fn(),
  updateUserInfo: jest.fn(),
  getUserProfile: jest.fn(),
  updateUserProfile: jest.fn(),
  getUserSettings: jest.fn(),
  updateUserSettings: jest.fn(),
};
