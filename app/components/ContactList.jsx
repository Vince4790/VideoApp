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
    componentWillMount: function(){
        var {dispatch} = this.props;
        dispatch(actions.startAddContacts(dispatch));
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
    var {videos, searchText, sort, videosLoaded, auth} = this.props;
    var filtered = ContactAPI.filterVideos(videos, searchText, sort);
    var renderVideos = () => {
      if (videos.length > 0){
        return filtered.map((video) => {
          return (
             <Contact key={video.id} {...video}/>
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
          <div style={{marginLeft:'40px',fontSize:'24px', fontFamily:'Arial, "Helvetica Neue", Helvetica, sans-serif', width:'80%'}}>
            <p>
              You have uploaded {filtered.length} video(s).  
            <span><a href="#" hidden={filtered.length > 0} onClick={this.handleAddNew}>Start uploading</a></span></p>
            <hr hidden={filtered.length === 0} style={{color:'black'}}/>
          </div>
          <ul className="thumb" hidden={filtered.length === 0}>
            {renderVideos()}
          </ul>

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
