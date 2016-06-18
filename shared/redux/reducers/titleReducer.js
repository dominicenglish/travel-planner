import { TITLE_SET } from '../actions/titleActions.js';

export default (state = '', action = {}) => {
  switch(action.type) {
    case TITLE_SET:
      if (action.title) {
        return action.title;
      }
      return state;
    default:
      return state;
  }
};
