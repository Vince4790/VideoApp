import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import VideoApp from 'VideoApp';
import LoginForm from 'LoginForm';

var requireLogin = (nextState, replace, next) => {
  if (localStorage.getItem("userId") === null) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (localStorage.getItem("userId")) {
    replace('/videos');
  }

  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="videos" component={VideoApp} onEnter={requireLogin}/>
      <IndexRoute component={LoginForm} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
