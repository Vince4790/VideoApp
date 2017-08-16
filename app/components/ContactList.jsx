var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import Contact from 'Contact';
import ModalForm from 'ModalForm';
var ContactAPI = require('ContactAPI');

var ContactList = React.createClass({
    sortContacts: function(){
      var {dispatch} = this.props;
      var attr = $('#sort-span').attr('class');
      if (attr === 'glyphicon glyphicon-triangle-top'){
        dispatch(actions.sortByNameDesc());
      } else if (attr === 'glyphicon glyphicon-triangle-bottom'){
        dispatch(actions.sortByNameAsc());
      }
      $('#sort-span').toggleClass('glyphicon-triangle-top glyphicon-triangle-bottom');
    },
    handleAddNew: function(e) {
      e.preventDefault();
      var {dispatch} = this.props;
      dispatch(actions.openModalForm({
        title: 'Add new video',
        actionType: 'ADD_CONTACT'
      }));
      $('#contact-modal').modal('show');
    },
    handleDeleteAll: function(){
      var {dispatch} = this.props;
      dispatch(actions.openModalForm({
        actionType: 'REMOVE_ALL',
        title: 'Are you sure you want to delete all videos ?'
      }));
      $('#confirm-modal').modal('show');
    },

    handleDeleteSelected: function(){
      var {dispatch} = this.props;
      dispatch(actions.openModalForm({
        actionType: 'REMOVE_SELECTED',
        title: 'Are you sure you want to delete selected videos ?'
      }));
      $('#confirm-modal').modal('show');
    },
  render: function(){
    var {contacts, searchText, dispatch, sort, showAllVideoRowCheckBox, videosLoaded} = this.props;
    var filtered = ContactAPI.filterContacts(contacts, searchText, sort);
    var renderContacts = () => {
      if (contacts.length > 0){
        return filtered.map((contact) => {
          return (
             <Contact key={contact.id} {...contact}/>
          )
        });
      }
    }
  if (! videosLoaded){
    return (
      <i className="fa fa-spinner fa-spin" style={{fontSize:'55px'}}></i>
    )
  } else {
  return (
    <div>
          <div style={{marginLeft:'40px'}}>
            <p>You have uploaded {filtered.length} video(s).  
            <span><a href="#" hidden={filtered.length > 0} onClick={this.handleAddNew}>Start uploading</a></span></p>
          </div>
          <hr hidden={filtered.length === 0}/>
          <table className="table" hidden={filtered.length === 0}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Number</th>
                <th>
                  <div id="button-remove" className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="removeMenu"
                    data-toggle="dropdown">
                     <span className="glyphicon glyphicon-trash"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="removeMenu">
                     <li><a href="#" onClick={this.handleDeleteSelected}>Remove Selected</a></li>
                     <li><a href="#" onClick={this.handleDeleteAll}>Remove All</a></li>
                    </ul>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {renderContacts()}
            </tbody>
          </table>
    </div>
  )
  }
  }
});

export default connect(
  (state) => {
    return state;
  }
)(ContactList);
