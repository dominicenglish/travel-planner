import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../shared/routes';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from '../shared/redux/reducers/index.js';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '../shared/redux/sagas/sagas.js';
require('../static/main.css');
require('../static/bundle.css');

const reduxState = window.__INITIAL_STATE__;
// const reducer = combineReducers(reducers);
const store = createStore(
  reducers.counter,
  reduxState,
  applyMiddleware(createSagaMiddleware(sagas)),
);

render((
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
), document.getElementById('root'));
