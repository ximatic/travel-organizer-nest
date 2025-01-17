import {
  InternalServerErrorException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { authGuardMock } from '../../__mocks__/auth.constants';
import {
  DEFAULT_SETTINGS_0,
  DEFAULT_SETTINGS_1,
  DEFAULT_SETTINGS_2,
  DEFAULT_SETTINGS_ID_1,
} from '../../__mocks__/settings.constants';

import { AuthGuard } from '../../auth/guards/auth.guard';

import { SettingsService } from '../service/settings.service';

import { CreateSettingsDto } from '../dto/create-settings.dto';
import { UpdateSettingsDto } from '../dto/update-settings.dto';

import { SettingsController } from './settings.controller';

const settingsServiceMock = {
  getSettings: jest.fn(),
  getSettingsById: jest.fn(),
  createSettings: jest.fn(),
  updateSettings: jest.fn(),
  resetSettings: jest.fn(),
};

describe('SettingsController', () => {
  let controller: SettingsController;
  let service: jest.Mocked<SettingsService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useValue: settingsServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = app.get<SettingsController>(SettingsController);
    service = app.get(SettingsService);
  });

  it('should be created', () => {
    expect(controller).toBeTruthy();
  });

  describe('getSettings()', () => {
    it('requesting default settings works', async () => {
      const mockedData = DEFAULT_SETTINGS_1;
      service.getSettings.mockResolvedValueOnce(mockedData);

      const result = await controller.getSettings();

      expect(result).toEqual(mockedData);
      expect(service.getSettings).toHaveBeenCalled();
    });

    it('requesting non-default settings works', async () => {
      const mockedData = DEFAULT_SETTINGS_2;
      service.getSettings.mockResolvedValueOnce(mockedData);

      const result = await controller.getSettings();

      expect(result).toEqual(mockedData);
      expect(service.getSettings).toHaveBeenCalled();
    });
  });

  describe('getSettingsById()', () => {
    it('requesting settings by a valid ID works', async () => {
      const id = DEFAULT_SETTINGS_ID_1.toString();
      const mockedData = DEFAULT_SETTINGS_1;
      service.getSettings.mockResolvedValueOnce(mockedData);

      const result = await controller.getSettingsById(id);

      expect(result).toEqual(mockedData);
      expect(service.getSettings).toHaveBeenCalled();
    });

    it('requesting invalid settings throws InternalServerErrorException error', async () => {
      service.getSettings.mockImplementationOnce(() => {
        throw new Error();
      });

      const id = DEFAULT_SETTINGS_ID_1.toString();
      let hasThrown = false;
      try {
        await controller.getSettingsById(id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting non-exisiting settings throws NotFoundException error', async () => {
      service.getSettings.mockImplementationOnce(() => null);

      const id = DEFAULT_SETTINGS_ID_1.toString();
      let hasThrown = false;
      try {
        await controller.getSettingsById(id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting settings with invalid ID throws BadRequestException error', async () => {
      const id = null;
      let hasThrown = false;
      try {
        await controller.getSettingsById(id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('createSettings()', () => {
    it('creating settings works', async () => {
      const mockedData = DEFAULT_SETTINGS_1;
      service.createSettings.mockResolvedValueOnce(mockedData);

      const createSettingsDto: CreateSettingsDto = {
        ...DEFAULT_SETTINGS_0,
      };
      const result = await controller.createSettings(createSettingsDto);

      expect(result).toEqual(mockedData);
      expect(service.createSettings).toHaveBeenCalled();
    });
  });

  describe('updateSettings()', () => {
    it('updating settings with exisiting ID works', async () => {
      const mockedData = DEFAULT_SETTINGS_2;
      service.updateSettings.mockResolvedValueOnce(mockedData);

      const updateSettingsDto: UpdateSettingsDto = {
        ...DEFAULT_SETTINGS_2,
      };
      const result = await controller.updateSettings(
        DEFAULT_SETTINGS_2._id.toString(),
        updateSettingsDto,
      );

      expect(result).toEqual(mockedData);
      expect(service.updateSettings).toHaveBeenCalled();
    });

    it('updating invalid settings throws InternalServerErrorException error', async () => {
      service.updateSettings.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_SETTINGS_2._id.toString();
      const updateSettingsDto: UpdateSettingsDto = {
        ...DEFAULT_SETTINGS_2,
      };
      let hasThrown = false;
      try {
        await controller.updateSettings(id, updateSettingsDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating non-exisiting settings throws NotFoundException error', async () => {
      service.updateSettings.mockImplementation(() => null);

      const id = DEFAULT_SETTINGS_2._id.toString();
      const updateSettingsDto: UpdateSettingsDto = {
        ...DEFAULT_SETTINGS_2,
      };

      let hasThrown = false;
      try {
        await controller.updateSettings(id, updateSettingsDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating settings with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const updateSettingsDto: UpdateSettingsDto = {
        ...DEFAULT_SETTINGS_2,
      };

      let hasThrown = false;
      try {
        await controller.updateSettings(id, updateSettingsDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('resetSettings()', () => {
    it('resetting settings with exisiting ID works', async () => {
      const mockedData = DEFAULT_SETTINGS_2;
      service.resetSettings.mockResolvedValueOnce(mockedData);

      const result = await controller.resetSettings(
        DEFAULT_SETTINGS_2._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(service.updateSettings).toHaveBeenCalled();
    });

    it('reset invalid settings throws InternalServerErrorException error', async () => {
      service.resetSettings.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_SETTINGS_2._id.toString();
      let hasThrown = false;
      try {
        await controller.resetSettings(id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('reset non-exisiting settings throws NotFoundException error', async () => {
      service.resetSettings.mockImplementation(() => null);

      const id = DEFAULT_SETTINGS_2._id.toString();
      let hasThrown = false;
      try {
        await controller.resetSettings(id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating settings with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const updateSettingsDto: UpdateSettingsDto = {
        ...DEFAULT_SETTINGS_2,
      };

      let hasThrown = false;
      try {
        await controller.updateSettings(id, updateSettingsDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });
});

function verifyExpectedInternalServerErrorException(error: any): void {
  expect(error).toBeInstanceOf(InternalServerErrorException);
  expect((error as InternalServerErrorException).getStatus()).toBe(
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  expect((error as InternalServerErrorException).getResponse()).toEqual({
    error: 'Internal Server Error',
    message: `Can't process request. Try again later.`,
    statusCode: 500,
  });
}

function verifyExpectedNotFoundException(error: any, id: string | null): void {
  expect(error).toBeInstanceOf(NotFoundException);
  expect((error as NotFoundException).getStatus()).toBe(HttpStatus.NOT_FOUND);
  expect((error as NotFoundException).getResponse()).toEqual({
    error: 'Not Found',
    message: `Settings with ID ${id} not found`,
    statusCode: 404,
  });
}

function verifyExpectedBadRequestException(
  error: any,
  id: string | null,
): void {
  expect(error).toBeInstanceOf(BadRequestException);
  expect((error as BadRequestException).getStatus()).toBe(
    HttpStatus.BAD_REQUEST,
  );
  expect((error as BadRequestException).getResponse()).toEqual({
    error: 'Bad Request',
    message: `Invalid settings ID: ${id}`,
    statusCode: 400,
  });
}
