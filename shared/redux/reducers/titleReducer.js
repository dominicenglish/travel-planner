import { TITLE_SET } from '../actions/titleActions.js';

export default (state = '', action = {}) => {
  switch(action.type) {
    case TITLE_SET:
      return action.title;
    default:
      return state;
  }
};
