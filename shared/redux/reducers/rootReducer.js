import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import trips from './tripsReducer.js';
import title from './titleReducer.js';
import navigation from './navigationReducer.js';
import map from './mapReducer.js';

const rootReducer = combineReducers({
  navigation,
  title,
  trips,
  form,
  routing,
  map,
});

export default rootReducer;
