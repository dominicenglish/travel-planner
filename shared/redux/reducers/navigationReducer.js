import { NAVIGATION_STATE_SET } from '../actions/navigationActions.js';

export default (state = false, action = {}) => {
  switch(action.type) {
    case NAVIGATION_STATE_SET:
      if (action.hasOwnProperty('isOpen')) {
        return action.isOpen;
      }
    default:
      return state;
  }
};
