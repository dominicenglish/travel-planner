import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin'; // Needed for pre 1.0 version of material-ui libarary
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import routes from '../shared/routes';
import rootReducer from '../shared/redux/reducers/rootReducer.js';
import * as sagas from '../shared/redux/sagas/sagas.js';
import getTheme from '../shared/theme/theme.js';

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

const history = syncHistoryWithStore(browserHistory, store);

// Needed for pre 1.0 version of material-ui libarary
injectTapEventPlugin();
const muiTheme = getMuiTheme(getTheme());
render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history}>{routes}</Router>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));
