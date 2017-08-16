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
      title: 'Edit video',
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
    var {name, number, checked} = this.props;
    return (    
        <tr className="video-row-data" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <td>
            <input type="checkbox" checked={checked} onClick={this.toggleCheck}/>
          </td>
          <td><a href="#" onClick={this.handleEdit}><span>{name}</span></a></td>
          <td>{number}</td>
          <td>
            <div hidden={!this.state.mouseEntered}>
              <button onClick={this.handleEdit}><span className="glyphicon glyphicon-pencil"></span></button>
              <button onClick={this.handleDelete}><span className="glyphicon glyphicon-remove"></span></button>
            </div>
          </td>
        </tr>
    )
  }
});

export default connect()(Contact);
