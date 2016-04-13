import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
  TRIPS_CREATE_SUCCESS,
} from '../actions/tripsActions.js';

export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case TRIPS_GET_SUCCESS:
      return [
        ...state,
        ...action.trips,
      ];
    case TRIPS_GET_FAIL:
      return state;
    case TRIPS_CREATE_SUCCESS:
      return [
        ...state,
        action.trip,
      ];
    default:
      return state;
  }
};
