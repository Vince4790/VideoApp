var React = require('react');
import * as Redux from 'react-redux';
import * as actions from 'actions';
require('bootstrap-validator');

export var Nav = React.createClass({
  handleSearchKeyPress: function(e){
    e.preventDefault();
    var {dispatch} = this.props;
    if (e.key === 'Enter'){
      var searchText = this.refs.searchText.value;
      dispatch(actions.setSearchText(searchText));
    } else {
      var input = $('#nav-bar-search').val();
      $('#nav-bar-search').val(input+e.key);
    }
  },
  handleAdd: function(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.openUploadForm({
      title: 'Add new video',
      actionType: 'ADD_CONTACT'
    }));
  },
  onLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(actions.startLogout());
  },
  render: function(){
    var {dispatch, searchText} = this.props;
    return (
      <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#" style={{color: 'deepskyblue'}}>MyVideo</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">Home <span className="sr-only">(current)</span></a></li>
        <li>
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input id="nav-bar-search" type="text" ref="searchText" className="form-control" placeholder="Search"
                onKeyPress={this.handleSearchKeyPress}/>
            </div>
            <button type="button" className="btn btn-default glyphicon glyphicon-search"
              onClick={() => {
                var searchText = this.refs.searchText.value;
                dispatch(actions.setSearchText(searchText));
              }}>

            </button>
          </form>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <button type="button" className="btn btn-primary btn-md" data-toggle="modal" data-target="#video-modal" style={{marginTop: '7px'}} onClick={this.handleAdd}>
            Upload Video
          </button>
        </li>
        <li><a href="#" data-toggle="tooltip" onClick={this.onLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
});

export default Redux.connect(
  (state) => {
    return state;
  }
)(Nav);
