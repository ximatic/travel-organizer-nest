export const mockRequestAccessToken = (value: any) => {
  return {
    json: jest.fn().mockReturnThis(),
    accessToken: jest.fn().mockReturnValue(value).mockReturnThis,
  } as any;
};
