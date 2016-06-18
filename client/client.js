import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import AppProvider from '../shared/containers/App/AppProvider.js';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin'; // Needed for pre 1.0 version of material-ui library


import rootReducer from '../shared/redux/reducers/rootReducer.js';
import sagas from '../shared/redux/sagas/sagas.js';

require('../static/main.css');
require('../static/bundle.css');

// Needed for pre 1.0 version of material-ui libarary
injectTapEventPlugin();

const reduxState = window.__INITIAL_STATE__;
const store = createStore(
  rootReducer,
  reduxState,
  compose(
    applyMiddleware(createSagaMiddleware(sagas), routerMiddleware(browserHistory)),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  ),
);

render(<AppProvider store={store}/>, document.getElementById('root'));

// Hot replace reducer manually if edits occur
if (module.hot) {
  module.hot.accept('../shared/redux/reducers/rootReducer.js', () => {
    store.replaceReducer(require('../shared/redux/reducers/rootReducer.js').default);
  });

  module.hot.accept('../shared/containers/App/AppProvider.js', () => {
    let NextApp = require('../shared/containers/App/AppProvider.js').default;
    render(<NextApp store={store}/>, document.getElementById('root'));
  });
}
