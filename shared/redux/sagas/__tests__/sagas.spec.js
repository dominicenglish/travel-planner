jest.unmock('../sagas.js');
jest.unmock('redux-saga/effects.js');
jest.unmock('redux-saga/lib/effects.js');

import { call, put } from 'redux-saga/effects.js';

import {
  getTrips,
  createTrip,
  getTrip,
  getStops,
  createStop,
  updateStop,
  deleteStop
} from '../sagas.js';
import apiClient from '../../../../api/ApiClient.js';
import {
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
  TRIPS_CREATE_SUCCESS,
  TRIPS_CREATE_FAIL,
  TRIP_GET_SUCCESS,
  TRIP_GET_FAIL
} from '../../actions/tripsActions.js';

import {
  STOPS_GET_SUCCESS,
  STOPS_GET_FAIL,
  STOPS_CREATE_SUCCESS,
  STOPS_CREATE_FAIL,
  STOPS_UPDATE_SUCCESS,
  STOPS_UPDATE_FAIL,
  STOPS_DELETE_SUCCESS,
  STOPS_DELETE_FAIL
} from '../../actions/stopsActions.js';

describe('sagas', () => {
  const api = apiClient();
  describe('getTrips', () => {
    it('should yield a call effect pointing to api.get', () => {
      const generator = getTrips();
      let next = generator.next();
      expect(next.value).toEqual(call(api.get, '/trips'));
    });

    it('should dispatch TRIPS_GET_SUCCESS action on success', () => {
      const generator = getTrips();
      generator.next();
      const { value: effect } = generator.next();
      expect(effect).toEqual(put({type: TRIPS_GET_SUCCESS, undefined}));
    });

    it('should dispatch TRIPS_CREATE_FAIL action on error', () => {
      const generator = getTrips();
      const fakeErrorMessage = 'message';
      generator.next();
      const { value: effect } = generator.throw(fakeErrorMessage);
      expect(effect).toEqual(put({type: TRIPS_GET_FAIL, error: fakeErrorMessage}));
    });
  });

  describe('createTrip', () => {
    it('should yield a call effect pointing to api.put', () => {
      const fakeAction = {
        departureDate: 'test',
        returnDate: 'test',
        title: 'test',
        description: 'test',
        image: 'test',
        users: [1],
      };
      const expectedParams = {params: fakeAction};
      const generator = createTrip(fakeAction);
      const { value: effect } = generator.next();
      expect(effect).toEqual(call(api.put, '/trips', expectedParams));
    });

    it('should dispatch TRIPS_CREATE_SUCCESS action on success', () => {

      const generator = createTrip();
      const fakeTrip = {fake: 'trip'};
      generator.next();
      const { value: effect } = generator.next(fakeTrip);
      expect(effect).toEqual(put({type: TRIPS_CREATE_SUCCESS, trip: fakeTrip}));
    });

    it('should dispatch TRIPS_CREATE_FAIL action on error', () => {
      const generator = createTrip();
      const fakeErrorMessage = 'message';
      generator.next();
      const { value: effect } = generator.throw(fakeErrorMessage);
      expect(effect).toEqual(put({type: TRIPS_CREATE_FAIL, error: fakeErrorMessage}));
    });
  });

  describe('getTrip', () => {
    it('should yield a call effect pointing to api.get', () => {
      const fakeAction = {tripId: 1};
      const generator = getTrip(fakeAction);
      const { value: effect } = generator.next();
      expect(effect).toEqual(call(api.get, `/trips/${fakeAction.tripId}`));
    });

    it('should dispatch TRIP_GET_SUCCESS action on success', () => {
      const generator = getTrip();
      const fakeTrip = {fake: 'trip'};
      generator.next();
      const { value: effect } = generator.next(fakeTrip);
      expect(effect).toEqual(put({type: TRIP_GET_SUCCESS, trip: fakeTrip}));
    });

    it('should dispatch TRIP_GET_FAIL action on fail', () => {
      const generator = getTrip();
      const fakeErrorMessage = 'message';
      generator.next();
      const { value: effect } = generator.throw(fakeErrorMessage);
      expect(effect).toEqual(put({type: TRIP_GET_FAIL, error: fakeErrorMessage}));
    });
  });

  describe('getStops', () => {
    it('should yield a call effect pointing to api.get', () => {
      const fakeAction = {tripId: 1};
      const expectedParams = {params: fakeAction};
      const generator = getStops(fakeAction);
      const { value: effect } = generator.next();
      expect(effect).toEqual(call(api.get, '/stops', expectedParams));
    });

    it('should yield a put effect to dispatch STOPS_GET_SUCCESS', () => {
      const fakeStop = {fake: 'stop'};
      const generator = getStops();
      generator.next();
      const { value: effect } = generator.next(fakeStop);
      expect(effect).toEqual(put({type: STOPS_GET_SUCCESS, stops: fakeStop}));
    });

    it('should yield a put effect to dispatch STOPS_GET_FAIL', () => {
      const fakeErrorMessage = 'message';
      const generator = getStops();
      generator.next();
      const { value: effect } = generator.throw(new Error(fakeErrorMessage));
      expect(effect).toEqual(put({type: STOPS_GET_FAIL, message: fakeErrorMessage, name: 'Error'}));
    });
  })

  describe('createStop', () => {
    it('should yield a call effect pointing to api.put', () => {
      const fakeAction = {
        tripId: 1,
        title: 'test',
        description: 'test',
        address: 'test',
        images: ['test'],
        coordinates: {lat: 1, lng: 1}
      };
      const expectedParams = {params: fakeAction};
      const generator = createStop(fakeAction);
      const { value: effect } = generator.next();
      expect(effect).toEqual(call(api.put, '/stops', expectedParams));
    });

    it('should yield a put effect to dispatch STOPS_CREATE_SUCCESS', () => {
      const fakeStop = {fake: 'stop'};
      const generator = createStop();
      generator.next();
      const { value: effect } = generator.next(fakeStop);
      expect(effect).toEqual(put({type: STOPS_CREATE_SUCCESS, stop: fakeStop}));
    });

    it('should yield a put effect to dispatch STOPS_CREATE_FAIL', () => {
      const fakeErrorMessage = 'message';
      const generator = createStop();
      generator.next();
      const { value: effect } = generator.throw(fakeErrorMessage);
      expect(effect).toEqual(put({type: STOPS_CREATE_FAIL, error: fakeErrorMessage}));
    });
  });

  describe('updateStop', () => {
    it('should yield a call effect pointing to api.post', () => {
      const fakeAction = {
        stopId: 1,
        tripId: 1,
        title: 'test',
        description: 'test',
        address: 'test',
        images: ['test'],
        coordinates: {lat: 1, lng: 1}
      };
      const expectedParams = {params: {
        tripId: fakeAction.tripId,
        title: fakeAction.title,
        description: fakeAction.description,
        address: fakeAction.address,
        images: fakeAction.images,
        coordinates: fakeAction.coordinates
      }};
      const generator = updateStop(fakeAction);
      const { value: effect } = generator.next();
      expect(effect).toEqual(call(api.post, `/stops/${fakeAction.stopId}`, expectedParams));
    });

    it('should yield a put effect to dispatch STOPS_UPDATE_SUCCESS', () => {
      const fakeStop = {fake: 'stop'};
      const generator = updateStop();
      generator.next();
      const { value: effect } = generator.next(fakeStop);
      expect(effect).toEqual(put({type: STOPS_UPDATE_SUCCESS, stop: fakeStop}));
    });

    it('should yield a put effect to dispatch STOPS_UPDATE_FAIL', () => {
      const fakeErrorMessage = 'message';
      const generator = updateStop();
      generator.next();
      const { value: effect } = generator.throw(fakeErrorMessage);
      expect(effect).toEqual(put({type: STOPS_UPDATE_FAIL, error: fakeErrorMessage}));
    });
  });

  describe('deleteStop', () => {
    it('should yield a call effect pointing to api.delete', () => {
      const fakeAction = {stopId: 1};
      const expectedParams = {params: fakeAction};
      const generator = deleteStop(fakeAction);
      const { value: effect } = generator.next();
      expect(effect).toEqual(call(api.delete, `/stops/${fakeAction.stopId}`));
    });

    it('should yield a put effect to dispatch STOPS_DELETE_SUCCESS', () => {
      const fakeStop = {fake: 'stop'};
      const generator = deleteStop();
      generator.next();
      const { value: effect } = generator.next(fakeStop);
      expect(effect).toEqual(put({type: STOPS_DELETE_SUCCESS, stop: fakeStop}));
    });

    it('should yield a put effect to dispatch STOPS_DELETE_FAIL', () => {
      const fakeErrorMessage = 'message';
      const generator = deleteStop();
      generator.next();
      const { value: effect } = generator.throw(fakeErrorMessage);
      expect(effect).toEqual(put({type: STOPS_DELETE_FAIL, error: fakeErrorMessage}));
    });
  });
});
