import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
} from '../actions/tripsActions.js';

export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case TRIPS_GET_SUCCESS:
      return [
        ...state,
        ...action.trips,
      ];
    case TRIPS_GET_FAIL:
    default:
      return state;
  }
};
