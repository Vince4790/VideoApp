var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var $ = require('jquery');

var ConfirmForm = React.createClass({
  handeSubmitModal: function(e){
    e.preventDefault();
    var {actionType, videos} = this.props.modalForm;
    var {dispatch} = this.props;
    if (actionType === 'REMOVE_SELECTED'){
      dispatch(actions.startRemoveSelected(videos));
    } else if (actionType === 'REMOVE_ALL'){
      dispatch(actions.startRemoveAll(videos));
    }
  },
  render: function(){
    var {modalForm, dispatch} = this.props;
    var name,number;
    return (
    <div id = "confirm-modal" className = "modal fade" role = "dialog" > <div className="modal-dialog">

      <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">{modalForm.title}</h4>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handeSubmitModal}>Yes</button>
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
)(ConfirmForm);
