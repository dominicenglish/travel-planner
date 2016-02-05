import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../shared/routes';
import { createStore, combineReducers } from 'redux';
import * as reducers from '../shared/reducers/index.js';
import { Provider } from 'react-redux';
require('../static/main.css');
require('../static/bundle.css');

const reduxState = window.__INITIAL_STATE__;
// const reducer = combineReducers(reducers);
const store = createStore(reducers.counter, reduxState);

render((
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
), document.getElementById('root'));
