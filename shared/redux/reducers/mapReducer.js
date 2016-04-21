import { MAP_CENTRE_SET } from '../actions/mapActions.js';

export default (state = {}, action = {}) => {
  switch(action.type) {
    case MAP_CENTRE_SET:
      const { lat, lng } = action;
      console.log('setting map centre', ({...state, centre: {lat, lng}}));
      return ({...state, centre: {lat, lng}});
    default:
      return state;
  }
};
