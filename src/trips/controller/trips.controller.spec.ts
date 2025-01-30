import {
  NotFoundException,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  DEFAULT_TRIP_1,
  DEFAULT_TRIP_2,
  DEFAULT_TRIP_ITEM_1,
  DEFAULT_TRIP_ITEM_2,
} from '../../__mocks__/constants/trips.constants';
import { authGuardMock } from '../../__mocks__/guards/auth.guard.mock';
import { tripsServiceMock } from '../../__mocks__/services/trips-service.mock';
import { mockRequestAccessToken } from '../../__mocks__/request.mock';

import { AuthGuard } from '../../auth/guards/auth.guard';

import { TripsService } from '../service/trips.service';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

import { TripsController } from './trips.controller';
import { DEFAULT_USER_1 } from '../../__mocks__/constants/user.constants';

describe('TripsController', () => {
  let tripsController: TripsController;
  let tripsService: jest.Mocked<TripsService>;

  const request = mockRequestAccessToken({ user: DEFAULT_USER_1 });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: tripsServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    tripsController = app.get<TripsController>(TripsController);
    tripsService = app.get(TripsService);
  });

  it('should be created', () => {
    expect(tripsController).toBeTruthy();
  });

  // trip

  describe('getTrips()', () => {
    it('returning no trips works', async () => {
      const mockedData = [];
      tripsService.getTripsByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripsController.getTrips(request);

      expect(result).toEqual(mockedData);
      expect(tripsService.getTripsByUserId).toHaveBeenCalled();
    });

    it('returning all trips works', async () => {
      const mockedData = [DEFAULT_TRIP_1, DEFAULT_TRIP_2];
      tripsService.getTripsByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripsController.getTrips(request);

      expect(result).toEqual(mockedData);
      expect(tripsService.getTripsByUserId).toHaveBeenCalled();
    });
  });

  describe('getTrip()', () => {
    it('requesting trip with exisiting ID works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.getTripByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripsController.getTrip(
        request,
        DEFAULT_TRIP_1._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.getTripByUserId).toHaveBeenCalled();
    });

    it('requesting invalid trip throws InternalServerErrorException error', async () => {
      tripsService.getTripByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.getTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting non-exisiting trip throws NotFoundException error', async () => {
      tripsService.getTripByUserId.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.getTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      let hasThrown = false;
      try {
        await tripsController.getTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('createTrip()', () => {
    it('creating trip works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.createTripByUserId.mockResolvedValueOnce(mockedData);

      const createTripDto: CreateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      const result = await tripsController.createTrip(request, createTripDto);

      expect(result).toEqual(mockedData);
      expect(tripsService.createTripByUserId).toHaveBeenCalled();
    });
  });

  describe('updateTrip()', () => {
    it('updating trip with exisiting ID works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.updateTripByUserId.mockResolvedValueOnce(mockedData);

      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      const result = await tripsController.updateTrip(
        request,
        DEFAULT_TRIP_1._id.toString(),
        updateTripDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.updateTripByUserId).toHaveBeenCalled();
    });

    it('updating invalid trip throws InternalServerErrorException error', async () => {
      tripsService.updateTripByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };
      let hasThrown = false;
      try {
        await tripsController.updateTrip(request, id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating non-exisiting trip throws NotFoundException error', async () => {
      tripsService.updateTripByUserId.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };

      let hasThrown = false;
      try {
        await tripsController.updateTrip(request, id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const updateTripDto: UpdateTripDto = {
        ...DEFAULT_TRIP_1,
      };

      let hasThrown = false;
      try {
        await tripsController.updateTrip(request, id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('deleteTrip()', () => {
    it('deleting trip with exisiting ID works', async () => {
      const mockedData = DEFAULT_TRIP_1;
      tripsService.deleteTripByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripsController.deleteTrip(
        request,
        DEFAULT_TRIP_1._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.deleteTripByUserId).toHaveBeenCalled();
    });

    it('deleting invalid trip throws InternalServerErrorException error', async () => {
      tripsService.deleteTripByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.deleteTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting non-exisiting trip throws NotFoundException error', async () => {
      tripsService.deleteTripByUserId.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.deleteTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      let hasThrown = false;
      try {
        await tripsController.deleteTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  // trip item

  describe('createTripItem()', () => {
    it('creating trip item for a trip with exisiting ID works', async () => {
      const mockedData = { ...DEFAULT_TRIP_1, items: [DEFAULT_TRIP_ITEM_1] };
      tripsService.createTripItemByUserId.mockResolvedValueOnce(mockedData);

      const createTripItemDto: CreateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_1,
      };
      const result = await tripsController.createTripItem(
        request,
        DEFAULT_TRIP_1._id.toString(),
        createTripItemDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.createTripItemByUserId).toHaveBeenCalled();
    });

    it('creating trip item for an invalid trip throws InternalServerErrorException error', async () => {
      tripsService.createTripItemByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = DEFAULT_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_1,
      };
      let hasThrown = false;
      try {
        await tripsController.createTripItem(request, id, createTripItemDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('creating trip item for a non-exisiting trip throws NotFoundException error', async () => {
      tripsService.createTripItemByUserId.mockImplementation(null);

      const id = DEFAULT_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_1,
      };
      let hasThrown = false;
      try {
        await tripsController.createTripItem(request, id, createTripItemDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('creating trip item for a trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const createTripItemDto: CreateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_1,
      };
      let hasThrown = false;
      try {
        await tripsController.createTripItem(request, id, createTripItemDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('updateTripItem()', () => {
    it('updating trip item for a trip with exisiting ID works', async () => {
      const mockedData = { ...DEFAULT_TRIP_1, items: [DEFAULT_TRIP_ITEM_2] };
      tripsService.updateTripItemByUserId.mockResolvedValueOnce(mockedData);

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_1._id.toString();
      const updateTripItemDto: UpdateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_2,
      };
      const result = await tripsController.updateTripItem(
        request,
        tripId,
        tripItemId,
        updateTripItemDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.createTripItemByUserId).toHaveBeenCalled();
    });

    it('updating trip item for an invalid trip throws InternalServerErrorException error', async () => {
      tripsService.updateTripItemByUserId.mockImplementation(() => {
        throw new Error();
      });

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_1._id.toString();
      const updateTripItemDto: UpdateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_2,
      };
      let hasThrown = false;
      try {
        await tripsController.updateTripItem(
          request,
          tripId,
          tripItemId,
          updateTripItemDto,
        );
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating trip item for a non-exisiting trip throws NotFoundException error', async () => {
      tripsService.updateTripItemByUserId.mockImplementation(null);

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_1._id.toString();
      const updateTripItemDto: UpdateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_2,
      };
      let hasThrown = false;
      try {
        await tripsController.updateTripItem(
          request,
          tripId,
          tripItemId,
          updateTripItemDto,
        );
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, tripId);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating trip item for a trip with invalid ID throws BadRequestException error', async () => {
      const tripId = null;
      const tripItemId = null;
      const updateTripItemDto: UpdateTripItemDto = {
        ...DEFAULT_TRIP_ITEM_2,
      };
      let hasThrown = false;
      try {
        await tripsController.updateTripItem(
          request,
          tripId,
          tripItemId,
          updateTripItemDto,
        );
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, tripId);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('deleteTripItem()', () => {
    it('deleting trip item for a trip with exisiting ID works', async () => {
      const mockedData = { ...DEFAULT_TRIP_1 };
      tripsService.deleteTripItemByUserId.mockResolvedValueOnce(mockedData);

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_1._id.toString();
      const result = await tripsController.deleteTripItem(
        request,
        tripId,
        tripItemId,
      );

      expect(result).toEqual(mockedData);
      expect(tripsService.createTripItemByUserId).toHaveBeenCalled();
    });

    it('deleting trip item for an invalid trip throws InternalServerErrorException error', async () => {
      tripsService.deleteTripItemByUserId.mockImplementation(() => {
        throw new Error();
      });

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.deleteTripItem(request, tripId, tripItemId);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting trip item for a non-exisiting trip throws NotFoundException error', async () => {
      tripsService.deleteTripItemByUserId.mockImplementation(null);

      const tripId = DEFAULT_TRIP_1._id.toString();
      const tripItemId = DEFAULT_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripsController.deleteTripItem(request, tripId, tripItemId);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, tripId);
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting trip item for a trip with invalid ID throws BadRequestException error', async () => {
      const tripId = null;
      const tripItemId = null;
      let hasThrown = false;
      try {
        await tripsController.deleteTripItem(request, tripId, tripItemId);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, tripId);
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
    message: `Trip with ID ${id} not found`,
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
    message: `Invalid trip ID: ${id}`,
    statusCode: 400,
  });
}
