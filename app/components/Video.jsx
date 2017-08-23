var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var $ = require('jquery');

var Video = React.createClass({
    addSourceToVideo: function(url){
        var video = document.getElementById('video-modal-player');
        //load the video source again
        video.load();
    },
  handleOpenVideoModal: function(){
    var {dispatch, id, name, url} = this.props;
    dispatch(actions.openModalForm({
      actionType: 'UPDATE_VIDEO',
      title: 'Now Playing',
      id: id,
      name: name,
      url: url
    }));


    this.addSourceToVideo(url);
    $('#player-modal').modal('show');
  },
  toggleCheck: function(){
    var {id, dispatch} = this.props;
    dispatch(actions.toggleCheck(id));
  },
  render: function(){
    var {name, url, checked} = this.props;
    return (    
        <li>
          <input type="checkbox" checked={checked} onClick={this.toggleCheck}/>
          <div className="overlay" onClick={this.handleOpenVideoModal}>
            <a href="#">
              <video className="video-js vjs-default-skin" style={{width:'192',height:'109',margin:'auto'}}>
                <source src={url} type="video/mp4"/>
                Your browser does not support HTML5 video.
              </video>
            </a>
            <a href="#" className="playWrapper">
              <span className="playBtn">
                <img src="/static/play-button.png" width="50" height="50" alt="" />
              </span>
            </a>
          </div>
         <div className="thumbCaption"><a href="#">{name}</a></div>
       </li>
    )
  }
});

export default connect()(Video);
