import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import routes from '../../../shared/routes';
import getTheme from '../../../shared/theme/theme.js';

class AppProvider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };
  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);
    const muiTheme = getMuiTheme(getTheme());
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Router history={history}>{routes}</Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default AppProvider;
