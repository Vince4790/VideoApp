var React = require('react');
var ReactDom = require('react-dom');
var {Provider} = require('react-redux');

var store = require('configureStore').configure();
import router from 'app/router/';
require('./scripts/form.js');
require('./styles/base.css');


ReactDom.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
