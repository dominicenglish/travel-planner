import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import trips from './tripsReducer.js';

const rootReducer = combineReducers({
  trips,
  form,
  routing,
});

export default rootReducer;
