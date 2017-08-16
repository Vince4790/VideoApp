var React = require('react');
import * as Redux from 'react-redux';
import * as actions from 'actions';

export var Footer = React.createClass({
  render: function(){
    return (
      <div className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <p className="navbar-text pull-left">© 2017 - Demo Built By Vince Hoang.
          </p>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(Footer);
