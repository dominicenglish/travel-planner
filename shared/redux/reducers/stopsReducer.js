import {
  STOPS_GET,
  STOPS_GET_SUCCESS,
  STOPS_GET_FAIL,
  STOPS_CREATE,
  STOPS_CREATE_SUCCESS,
  STOPS_CREATE_FAIL,
  STOPS_UPDATE,
  STOPS_UPDATE_SUCCESS,
  STOPS_UPDATE_FAIL,
  STOPS_DELETE,
  STOPS_DELETE_SUCCESS,
  STOPS_DELETE_FAIL
} from '../actions/stopsActions.js';

export default (state={}, action={}) => {
  switch(action.type) {
    case STOPS_GET_SUCCESS:
      if (action.stops) {
        console.log('get stops', action.stops);
        return Object.assign({}, state, action.stops);
      }
    case STOPS_CREATE_SUCCESS:
    case STOPS_UPDATE_SUCCESS:
      if (action.stop) {
        const stop = {};
        stop[action.stop.id] = action.stop;
        return Object.assign({}, state, stop);
      }
    case STOPS_DELETE_SUCCESS:
      if (action.id) {
        const newState = Object.assign({}, state);
        delete newState[action.id];
        return newState;
      }
    default:
      return state;
  };
};
