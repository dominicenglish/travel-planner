import 'babel-polyfill';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import useragent from 'express-useragent';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import webpackConfig from '../webpack.config.dev';
import routes from '../shared/routes';
import rootReducer from '../shared/redux/reducers/rootReducer.js';
import * as sagas from '../shared/redux/sagas/sagas.js';
import getTheme from '../shared/theme/theme.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/static', express.static('static'));

// Setup hot module reloading via webpack
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {}));

app.use(useragent.express());

app.use(function(req, res, next) {
  // needed by material-ui
  global.navigator = {userAgent: req.useragent.source};
  next();
});

app.use(handleRender);

function handleRender(req, res) {

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let load
      let initialState = {};
      if (renderProps.routes[0].load &&
        typeof renderProps.routes[0].load === 'function') {
        initialState = renderProps.routes[0].load() || {};
      }
      const store = createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(createSagaMiddleware(sagas.watchTripsRequest)),
          typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
        ),
      );
      const reduxState = store.getState();
      const muiTheme = getMuiTheme(getTheme());
      const InitialComponent = (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        </MuiThemeProvider>
      );
      res.status(200).send(renderFullPage(renderToString(InitialComponent), reduxState));
    } else {
      res.status(404).send('Not found');
    }
  });
};

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Transform Boilerplate</title>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port, '192.168.1.5', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://192.168.1.5:'+port);
});
