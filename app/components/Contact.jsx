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
    var {dispatch, id, name, number, videoRow} = this.props;
    dispatch(actions.openModalForm({
      actionType: 'UPDATE_CONTACT',
      title: 'Now Playing',
      id: id,
      name: name,
      number: number
    }));
    $('#contact-modal').modal('show');
  },
  toggleCheck: function(){
    var {id, dispatch} = this.props;
    dispatch(actions.toggleCheck(id));
  },
  render: function(){
    var {name, number, checked,id} = this.props;
    return (    
        <li>
          <input type="checkbox" checked={checked} onClick={this.toggleCheck}/>
          <div className="overlay" onClick={this.handleEdit}>
            <a href="#"><img className="thumbnail" src="https://homepages.cae.wisc.edu/~ece533/images/monarch.png" width="192" height="109" alt="" /></a>
            <span className="time">3:28</span>
            <a href="#" className="playWrapper">
              <span className="playBtn"><img src="http://wptf.com/wp-content/uploads/2014/05/play-button.png" width="50" height="50" alt="" /></span>
            </a>
          </div>
         <div className="thumbCaption"><a href="#">This is the description of video</a></div>
       </li>
    )
  }
});

export default connect()(Contact);
