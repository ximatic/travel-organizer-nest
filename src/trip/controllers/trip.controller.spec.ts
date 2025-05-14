import {
  NotFoundException,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  MOCK_CREATE_TRIP_1,
  MOCK_CREATE_TRIP_ITEM_1,
  MOCK_TRIP_1,
  MOCK_TRIP_2,
  MOCK_TRIP_ITEM_1,
  MOCK_TRIP_ITEM_2,
  MOCK_UPDATE_TRIP_1,
  MOCK_UPDATE_TRIP_ITEM_1,
} from '../../../__mocks__/constants/trip.constants';
import { MOCK_USER_1 } from '../../../__mocks__/constants/user.constants';
import { tokenGuardMock } from '../../../__mocks__/guards/token.guard.mock';
import { tripServiceMock } from '../../../__mocks__/services/trip.service.mock';
import { mockRequestAccessToken } from '../../../__mocks__/request.mock';

import { TokenGuard } from '../../token/guards/token.guard';

import { TripService } from '../services/trip.service';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { CreateTripItemDto } from '../dto/create-trip-item.dto';
import { UpdateTripItemDto } from '../dto/update-trip-item.dto';

import { TripController } from './trip.controller';

describe('TripController', () => {
  let tripController: TripController;
  let tripService: jest.Mocked<TripService>;

  const request = mockRequestAccessToken({ user: MOCK_USER_1 });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: tripServiceMock,
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(tokenGuardMock)
      .compile();

    tripController = app.get<TripController>(TripController);
    tripService = app.get(TripService);
  });

  it('should be created', () => {
    expect(tripController).toBeTruthy();
  });

  // trip

  describe('getTrips()', () => {
    it('returning no trips works', async () => {
      const mockedData = [];
      tripService.getTripsByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripController.getTrips(request);

      expect(result).toEqual(mockedData);
      expect(tripService.getTripsByUserId).toHaveBeenCalled();
    });

    it('returning all trips works', async () => {
      const mockedData = [MOCK_TRIP_1, MOCK_TRIP_2];
      tripService.getTripsByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripController.getTrips(request);

      expect(result).toEqual(mockedData);
      expect(tripService.getTripsByUserId).toHaveBeenCalled();
    });
  });

  describe('getTrip()', () => {
    it('requesting trip with exisiting ID works', async () => {
      const mockedData = MOCK_TRIP_1;
      tripService.getTripByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripController.getTrip(
        request,
        MOCK_TRIP_1._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(tripService.getTripByUserId).toHaveBeenCalled();
    });

    it('requesting invalid trip throws InternalServerErrorException error', async () => {
      tripService.getTripByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = MOCK_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripController.getTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('requesting non-exisiting trip throws NotFoundException error', async () => {
      tripService.getTripByUserId.mockImplementation(null);

      const id = MOCK_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripController.getTrip(request, id);
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
        await tripController.getTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('createTrip()', () => {
    it('creating trip works', async () => {
      const mockedData = MOCK_TRIP_1;
      tripService.createTripByUserId.mockResolvedValueOnce(mockedData);

      const createTripDto: CreateTripDto = MOCK_CREATE_TRIP_1;
      const result = await tripController.createTrip(request, createTripDto);

      expect(result).toEqual(mockedData);
      expect(tripService.createTripByUserId).toHaveBeenCalled();
    });
  });

  describe('updateTrip()', () => {
    it('updating trip with exisiting ID works', async () => {
      const mockedData = MOCK_TRIP_1;
      tripService.updateTripByUserId.mockResolvedValueOnce(mockedData);

      const updateTripDto: UpdateTripDto = MOCK_UPDATE_TRIP_1;
      const result = await tripController.updateTrip(
        request,
        MOCK_TRIP_1._id.toString(),
        updateTripDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripService.updateTripByUserId).toHaveBeenCalled();
    });

    it('updating invalid trip throws InternalServerErrorException error', async () => {
      tripService.updateTripByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = MOCK_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = MOCK_UPDATE_TRIP_1;

      let hasThrown = false;
      try {
        await tripController.updateTrip(request, id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating non-exisiting trip throws NotFoundException error', async () => {
      tripService.updateTripByUserId.mockImplementation(null);

      const id = MOCK_TRIP_1._id.toString();
      const updateTripDto: UpdateTripDto = MOCK_UPDATE_TRIP_1;

      let hasThrown = false;
      try {
        await tripController.updateTrip(request, id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('updating trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const updateTripDto: UpdateTripDto = MOCK_UPDATE_TRIP_1;

      let hasThrown = false;
      try {
        await tripController.updateTrip(request, id, updateTripDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('deleteTrip()', () => {
    it('deleting trip with exisiting ID works', async () => {
      const mockedData = MOCK_TRIP_1;
      tripService.deleteTripByUserId.mockResolvedValueOnce(mockedData);

      const result = await tripController.deleteTrip(
        request,
        MOCK_TRIP_1._id.toString(),
      );

      expect(result).toEqual(mockedData);
      expect(tripService.deleteTripByUserId).toHaveBeenCalled();
    });

    it('deleting invalid trip throws InternalServerErrorException error', async () => {
      tripService.deleteTripByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = MOCK_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripController.deleteTrip(request, id);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting non-exisiting trip throws NotFoundException error', async () => {
      tripService.deleteTripByUserId.mockImplementation(null);

      const id = MOCK_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripController.deleteTrip(request, id);
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
        await tripController.deleteTrip(request, id);
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
      const mockedData = { ...MOCK_TRIP_1, items: [MOCK_TRIP_ITEM_1] };
      tripService.createTripItemByUserId.mockResolvedValueOnce(mockedData);

      const createTripItemDto: CreateTripItemDto = MOCK_CREATE_TRIP_ITEM_1;
      const result = await tripController.createTripItem(
        request,
        MOCK_TRIP_1._id.toString(),
        createTripItemDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripService.createTripItemByUserId).toHaveBeenCalled();
    });

    it('creating trip item for an invalid trip throws InternalServerErrorException error', async () => {
      tripService.createTripItemByUserId.mockImplementation(() => {
        throw new Error();
      });

      const id = MOCK_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = MOCK_CREATE_TRIP_ITEM_1;
      let hasThrown = false;
      try {
        await tripController.createTripItem(request, id, createTripItemDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('creating trip item for a non-exisiting trip throws NotFoundException error', async () => {
      tripService.createTripItemByUserId.mockImplementation(null);

      const id = MOCK_TRIP_1._id.toString();
      const createTripItemDto: CreateTripItemDto = MOCK_CREATE_TRIP_ITEM_1;
      let hasThrown = false;
      try {
        await tripController.createTripItem(request, id, createTripItemDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedNotFoundException(error, id);
      }

      expect(hasThrown).toBe(true);
    });

    it('creating trip item for a trip with invalid ID throws BadRequestException error', async () => {
      const id = null;
      const createTripItemDto: CreateTripItemDto = MOCK_CREATE_TRIP_ITEM_1;
      let hasThrown = false;
      try {
        await tripController.createTripItem(request, id, createTripItemDto);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedBadRequestException(error, id);
      }

      expect(hasThrown).toBe(true);
    });
  });

  describe('updateTripItem()', () => {
    it('updating trip item for a trip with exisiting ID works', async () => {
      const mockedData = { ...MOCK_TRIP_1, items: [MOCK_TRIP_ITEM_2] };
      tripService.updateTripItemByUserId.mockResolvedValueOnce(mockedData);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_1._id.toString();
      const updateTripItemDto: UpdateTripItemDto = MOCK_UPDATE_TRIP_ITEM_1;
      const result = await tripController.updateTripItem(
        request,
        tripId,
        tripItemId,
        updateTripItemDto,
      );

      expect(result).toEqual(mockedData);
      expect(tripService.createTripItemByUserId).toHaveBeenCalled();
    });

    it('updating trip item for an invalid trip throws InternalServerErrorException error', async () => {
      tripService.updateTripItemByUserId.mockImplementation(() => {
        throw new Error();
      });

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_1._id.toString();
      const updateTripItemDto: UpdateTripItemDto = MOCK_UPDATE_TRIP_ITEM_1;
      let hasThrown = false;
      try {
        await tripController.updateTripItem(
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
      tripService.updateTripItemByUserId.mockImplementation(null);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_1._id.toString();
      const updateTripItemDto: UpdateTripItemDto = MOCK_UPDATE_TRIP_ITEM_1;
      let hasThrown = false;
      try {
        await tripController.updateTripItem(
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
      const updateTripItemDto: UpdateTripItemDto = MOCK_UPDATE_TRIP_ITEM_1;
      let hasThrown = false;
      try {
        await tripController.updateTripItem(
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
      const mockedData = { ...MOCK_TRIP_1 };
      tripService.deleteTripItemByUserId.mockResolvedValueOnce(mockedData);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_1._id.toString();
      const result = await tripController.deleteTripItem(
        request,
        tripId,
        tripItemId,
      );

      expect(result).toEqual(mockedData);
      expect(tripService.createTripItemByUserId).toHaveBeenCalled();
    });

    it('deleting trip item for an invalid trip throws InternalServerErrorException error', async () => {
      tripService.deleteTripItemByUserId.mockImplementation(() => {
        throw new Error();
      });

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripController.deleteTripItem(request, tripId, tripItemId);
      } catch (error: any) {
        hasThrown = true;
        verifyExpectedInternalServerErrorException(error);
      }

      expect(hasThrown).toBe(true);
    });

    it('deleting trip item for a non-exisiting trip throws NotFoundException error', async () => {
      tripService.deleteTripItemByUserId.mockImplementation(null);

      const tripId = MOCK_TRIP_1._id.toString();
      const tripItemId = MOCK_TRIP_1._id.toString();
      let hasThrown = false;
      try {
        await tripController.deleteTripItem(request, tripId, tripItemId);
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
        await tripController.deleteTripItem(request, tripId, tripItemId);
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
