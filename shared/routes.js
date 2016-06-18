import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Home,
  Trips,
  Trip,
  Stop,
  AddStops,
} from './containers/containers.js';
// These should get removed as they should be done from inside containers
import {
  Counter,
  SignIn,
  SignUp,
  AddTrips,
} from './components/components.js';

const requireLogin = (nextState, replaceState, cb) => {
  cb(); return; //CRAZY
  function checkAuth() {
    const { auth: { user }} = store.getState();
    if (!user) {
      replaceState(null, '/');
    }
    cb();
  }

  if (!isAuthLoaded(store.getState())) {
    store.dispatch(loadAuth()).then(checkAuth);
  } else {
    checkAuth();
  }
};

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='signin' component={SignIn} />
    <Route path='signup' component={SignUp} />

    <Route onEnter={requireLogin}>
      <Route path='trips' component={Trips}>
        <Route path='add' component={AddTrips} />
      </Route>
      <Route path='/trips/:tripId' component={Trip}>
        <Route path='/trips/:tripId/stops/add' component={AddStops} />
        <Route path='/trips/:tripId/stops/:stopId' component={Stop} />
      </Route>
    </Route>
  </Route>
);
