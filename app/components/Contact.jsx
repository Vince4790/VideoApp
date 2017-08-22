var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var $ = require('jquery');

var Contact = React.createClass({
  getInitialState: function(e){
    return {mouseEntered: false};
  },
  handleMouseEnter: function(e){
    this.setState({mouseEntered: true});
  },
  handleMouseLeave: function(e){
    this.setState({mouseEntered: false});
  },
  handleDelete: function(){
    var {id, name, number, dispatch} = this.props;
    dispatch(actions.openModalForm({
      actionType: 'REMOVE_CONTACT',
      title: 'Are you sure you want to delete ?',
      id: id,
      name: name,
      number: number
    }));
    $('#confirm-modal').modal('show');
  },
  handleClick: function(e){
      this.setState({checkAll: this.state.checkAll});
  },
  handleEdit: function(){
    var {dispatch, id, name, url} = this.props;
    dispatch(actions.openModalForm({
      actionType: 'UPDATE_CONTACT',
      title: 'Now Playing',
      id: id,
      name: name,
      url: url
    }));
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
          <div className="overlay" onClick={this.handleEdit}>
            <a href="#">
              <video className="video-js vjs-default-skin" style={{width:'192',height:'109',margin:'auto'}}>
                <source src={url}
                        type="video/mp4"/>
                Your browser does not support HTML5 video.
              </video>
            </a>
            <a href="#" className="playWrapper">
              <span className="playBtn">
                <img src="http://wptf.com/wp-content/uploads/2014/05/play-button.png" width="50" height="50" alt="" />
              </span>
            </a>
          </div>
         <div className="thumbCaption"><a href="#">{name}</a></div>
       </li>
    )
  }
});

export default connect()(Contact);
