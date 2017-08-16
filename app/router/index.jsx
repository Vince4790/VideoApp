import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import PhoneBookApp from 'PhoneBookApp';
import LoginForm from 'LoginForm';
import firebase from 'app/firebase/';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/contacts');
  }

  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="contacts" component={PhoneBookApp} onEnter={requireLogin}/>
      <IndexRoute component={LoginForm} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
