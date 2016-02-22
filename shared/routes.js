import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Home,
  Trips,
} from './containers';
// These should get removed as they should be done from inside containers
import {
  Counter,
  SignIn,
  SignUp,
} from './components';

// import ApiClient from '../api/ApiClient';
// const api = new ApiClient();
// api.get('/trips').then(data => console.log(data));

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
    <IndexRoute component={Home}/>
    <Route path='signin' component={SignIn}/>
    <Route path='signup' component={SignUp}/>

    <Route onEnter={requireLogin}>
      <Route path='trips' component={Trips}/>
    </Route>
  </Route>
);

// export default (
//   <Route path='/' component={App}>
//   </Route>
// );
