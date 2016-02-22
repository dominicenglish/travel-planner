import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../shared/routes';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import rootReducer from '../shared/redux/reducers/rootReducer.js';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as sagas from '../shared/redux/sagas/sagas.js';
require('../static/main.css');
require('../static/bundle.css');

const reduxState = window.__INITIAL_STATE__;

const store = createStore(
  rootReducer,
  reduxState,
  compose(
    applyMiddleware(createSagaMiddleware(sagas.watchTripsRequest)),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  ),
);

render((
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
), document.getElementById('root'));
