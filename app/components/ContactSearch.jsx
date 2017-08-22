var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var $ = require('jquery');

var ContactSearch = React.createClass({
  handleAdd: function(e) {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.openModalForm({
      title: 'Add contact',
      actionType: 'ADD_CONTACT'
    }));
    $('#player-modal').modal('show');
  },

  handleDeleteAll: function(){
    var {dispatch} = this.props;
    dispatch(actions.startRemoveAll());
  },

  handleDeleteSelected: function(){
    var {dispatch} = this.props;
    dispatch(actions.startRemoveSelected());
  },

  render: function(){
    var {dispatch, searchText} = this.props;
    return (
        <div className="container">
            <div className="row">
              <div id="search-input" className="col-md-6 col-md-offset-1">
        <div className="input-group">
          <span className="input-group-addon glyphicon glyphicon-search"></span>
          <input type='search' className="form-control" ref="searchText"
            aria-described="basic-addon"
            placeholder={searchText} value={searchText}
            onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }}/>
          </div>
        </div>
        <div id="button-add" className="col-md-1">
          <div className="col-md-6">
          <button type="button" className="btn btn-info btn-md" onClick={this.handleAdd}>
            New
          </button>
          </div>
        </div>
        <div id="button-remove" className="col-md-1">
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="removeMenu"
                data-toggle="dropdown">
                <span className="glyphicon glyphicon-trash"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="removeMenu">
                  <li><a href="#" onClick={this.handleDeleteSelected}>Remove Selected</a></li>
                  <li><a href="#" onClick={this.handleDeleteAll}>Remove All</a></li>
                </ul>
            </div>
          </div>
            </div>
          </div>
    );
  }
});

export default connect(
  (state) => {
    return state;
  }
)(ContactSearch);
