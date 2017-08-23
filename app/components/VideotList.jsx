var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
import Video from 'app/components/Video';
var VideoAPI = require('VideoAPI');

var VideoList = React.createClass({
    componentWillMount: function(){
        var {dispatch} = this.props;
        dispatch(actions.startAddVideos(dispatch));
    },
    handleAddNew: function(e) {
      e.preventDefault();
      var {dispatch, videos} = this.props;
      dispatch(actions.openUploadForm({
          title: 'Add new video',
          actionType: 'ADD_VIDEO'
      }));
      $('#video-modal').modal('show');
    },
    handleDeleteAll: function(){
      var {dispatch, videos} = this.props;
      dispatch(actions.openModalForm({
        videos: videos,
        actionType: 'REMOVE_ALL',
        title: 'Are you sure you want to delete all videos ?'
      }));
      $('#confirm-modal').modal('show');
    },

    handleDeleteSelected: function(){
      var {dispatch, videos} = this.props;
      dispatch(actions.openModalForm({
          videos: videos,
        actionType: 'REMOVE_SELECTED',
        title: 'Are you sure you want to delete selected videos ?'
      }));
      $('#confirm-modal').modal('show');
    },
  render: function(){
    var {videos, searchText, sort, videosLoaded} = this.props;
    var filtered = VideoAPI.filterVideos(videos, searchText, sort);
    var renderVideos = () => {
      if (videos.length > 0){
        return filtered.map((video) => {
          return (
             <Video key={video.id} {...video}/>
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
          <div style={{
              marginLeft: '5px',
              fontSize: '24px',
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              width: '90%'
          }}>
              <p>
                  You have uploaded {filtered.length} video(s).
                  <span><a href="#" hidden={filtered.length > 0} onClick={this.handleAddNew}>Start uploading</a></span>
              </p>
              <div id="button-remove" className="dropdown" hidden={filtered.length === 0}>
                  <button className="btn btn-default dropdown-toggle" type="button" id="removeMenu"
                          data-toggle="dropdown">
                      <span className="glyphicon glyphicon-trash"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="removeMenu">
                      <li><a href="#" onClick={this.handleDeleteSelected}>Remove Selected</a></li>
                      <li><a href="#" onClick={this.handleDeleteAll}>Remove All</a></li>
                  </ul>
              </div>
              <hr hidden={filtered.length === 0}/>
              <ul className="thumb" hidden={filtered.length === 0} style={{padding:'0'}}>
                  {renderVideos()}
              </ul>
          </div>
      </div>
  )
  }
  }
});

export default connect(
  (state) => {
    return state;
  }
)(VideoList);
