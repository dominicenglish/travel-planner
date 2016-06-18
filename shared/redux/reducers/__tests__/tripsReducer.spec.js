jest.unmock('../tripsReducer.js');

import tripsReducer from '../tripsReducer.js';

import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
  TRIPS_CREATE_SUCCESS,
  TRIP_GET_SUCCESS,
} from '../../actions/tripsActions.js';

describe('tripsReducer', () => {
  it('should return existing state if no cases match', () => {
    const state = [{fake: 'trip'}];
    const action = {type: 'awelfkiasiodfja'};
    const newState = tripsReducer(state, action);
    expect(newState).toEqual(state);
  });

  describe('TRIPS_GET_SUCCESS', () => {
    it('should return trips with new trips on the end', () => {
      const state = [{trip: 1}, {trip: 2}];
      const newTrips = [{trip: 3}, {trip: 4}];
      const action = {type: TRIPS_GET_SUCCESS, trips: newTrips};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual([...state, ...newTrips]);
    });

    it('should return old state if newTrips is empty', () => {
      const state = [{trip: 1}, {trip: 2}];
      const newTrips = [];
      const action = {type: TRIPS_GET_SUCCESS, trips: newTrips};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual(state);
    });

    it('should return old state if newTrips is undefined', () => {
      const state = [{trip: 1}, {trip: 2}];
      const action = {type: TRIPS_GET_SUCCESS, trips: undefined};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });

  describe('TRIPS_CREATE_SUCCESS', () => {
    it('should return state with new trip on the end', () => {
      const state = [{trip: 1}, {trip: 2}];
      const newTrip = {trip: 3};
      const action = {type: TRIPS_CREATE_SUCCESS, trip: newTrip};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual([...state, newTrip]);
    });

    it('should return old state if trip is undefined', () => {
      const state = [{trip: 1}, {trip: 2}];
      const action = {type: TRIPS_CREATE_SUCCESS, trip: undefined};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });

  describe('TRIP_GET_SUCCESS', () => {
    it('should return state with new trip on the end', () => {
      const state = [{trip: 1}, {trip: 2}];
      const newTrip = {trip: 3};
      const action = {type: TRIP_GET_SUCCESS, trip: newTrip};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual([...state, newTrip]);
    });

    it('should return old state if trip is undefined', () => {
      const state = [{trip: 1}, {trip: 2}];
      const action = {type: TRIP_GET_SUCCESS, trip: undefined};
      const newState = tripsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });
});
