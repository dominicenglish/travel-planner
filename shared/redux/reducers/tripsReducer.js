import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
  TRIPS_CREATE_SUCCESS,
  TRIP_GET_SUCCESS,
} from '../actions/tripsActions.js';

import {
  STOPS_CREATE_SUCCESS,
} from '../actions/stopsActions.js';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case TRIPS_GET_SUCCESS:
      if (action.trips) {
        return {
          ...state,
          ...action.trips,
        };
      }
    case TRIPS_CREATE_SUCCESS:
      if (action.trip) {
        return {
          ...state,
          ...{[action.trip.id]: action.trip},
        };
      }
    case TRIP_GET_SUCCESS:
      if (action.trip) {
        return {
          ...state,
          ...{[action.trip.id]: action.trip},
        };
      }
    case STOPS_CREATE_SUCCESS:
      if (action.stop) {
        const trip = {...state[action.stop.tripId]};
        trip.stops.push(action.stop.id);
        return {
          ...state,
          ...{[trip.id]: trip},
        };
      }
    default:
      return state;
  }
};
