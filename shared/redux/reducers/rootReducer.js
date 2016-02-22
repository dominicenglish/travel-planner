import { combineReducers } from 'redux';
import trips from './tripsReducer.js';

const rootReducer = combineReducers({
  trips,
});

export default rootReducer;
