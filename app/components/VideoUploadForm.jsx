var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var validator = require('validator');
var $ = require('jquery');

var VideoUploadForm = React.createClass({
  cleanUpErrorMessage: function(){
    $('#name-form-group').removeClass('has-error has-feedback');
    $('#input-name').next('.error-message').remove();
    $('#number-form-group').removeClass('has-error has-feedback');
    $('#input-number').next('.error-message').remove();
  },
  showErrorNameInput: function(){
    $('#name-form-group').addClass('has-error has-feedback');
    if ($('#input-name').next('.error-message').length === 0){
      $('#input-name').after("<div class='error-message' style='color:red'>Please enter valid name</div>");
    }
  },
  showErrorNumberInput: function(){
    $('#number-form-group').addClass('has-error has-feedback');
    if ($('#input-number').next('.error-message').length === 0){
      $('#input-number').after("<div class='error-message' style='color:red'>Please enter only digits</div>");
    }
  },
  handleSubmitModal: function(e){
    e.preventDefault();
    var {actionType, id} = this.props.modalForm;
    var name = this.refs.name.value;
    var number = this.refs.number.value;
    var passedValidateName = validator.validateString(name);
    var passedValidateNumber = validator.validateNumber(number);
    if (!passedValidateName){
      this.showErrorNameInput();
    }
    if (!passedValidateNumber){
      this.showErrorNumberInput();
    }
    if (passedValidateNumber && passedValidateName){
      var {dispatch} = this.props;
      if (actionType === 'ADD_CONTACT'){
        dispatch(actions.startAddContact({
          name: name,
          number: number,
          checked: false
        }));
      } else if (actionType === 'UPDATE_CONTACT'){
        dispatch(actions.startUpdateContact({
          id, id,
          name: name,
          number: number
        }));
      }
      $('#contact-modal').modal('hide');
    }
  },
  render: function(){
    var {modalForm, dispatch} = this.props;
    var name,number;
    return (
      <div id="video-modal" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
<div className="modal-dialog">

<div className="modal-content">
<div className="modal-header">
  <button type="button" className="close" data-dismiss="modal" onClick={this.cleanUpErrorMessage}>&times;</button>
  <h4 className="modal-title" style={{color: 'deepskyblue'}}>New Video</h4>
</div>
<div className="modal-body">
  <form id="upload-form" className="form-horizontal" role="form" action="/">
                  <div className="form-group">
                    <input type="text" id="upload-form-video-name" style={{marginLeft:'15px',width:'80%'}} tabIndex="1" className="form-control" placeholder="Enter video name" required/>
                  </div>
                  <div className="form-group">
                      <input type="file" name="video"  style={{marginLeft:'15px'}} accept="video/*" />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6 col-sm-offset-5" style={{paddingLeft:'0'}}>
                        <input type="submit" id="upload-submit" className="btn btn-register" value="Upload Video" required/>
                      </div>
                    </div>
                  </div>
  </form>
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
)(VideoUploadForm);