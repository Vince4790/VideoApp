var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var validator = require('validator');
var $ = require('jquery');

var ModalForm = React.createClass({
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
      <div id="contact-modal" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
<div className="modal-dialog">

<div className="modal-content">
<div className="modal-header">
<button type="button" className="close" data-dismiss="modal" onClick={this.cleanUpErrorMessage}>&times;</button>
<h4 className="modal-title">{modalForm.title}</h4>
</div>
<div className="modal-body">
  <form id="modal-form" className="form-horizontal" role="form">
                    <div id="name-form-group" className="form-group">
                      <label htmlFor="inputName" className="col-sm-2 control-label">Name</label>
                              <div className="col-sm-10">
                          <input id="input-name" type="text" data-minlength="2" className="form-control input-name" ref="name"
                          placeholder="Enter name" value={modalForm.name}
                          onBlur={() => {
                            if (!validator.validateString(this.refs.name.value)){
                              this.showErrorNameInput();
                            } else {
                              $('#name-form-group').removeClass('has-error has-feedback');
                              $('#input-name').next('.error-message').remove();
                            }
                          }}
                          onChange={()=>{
                            dispatch(actions.openModalForm({
                              ...modalForm,
                              name: this.refs.name.value
                            }));
                          }} required/>
                      </div>
                    </div>
                    <div id="number-form-group" className="form-group">
                      <label className="col-sm-2 control-label">Number</label>
                          <div className="col-sm-10">
                          <input id="input-number" type="text" className="form-control" ref="number"
                            placeholder="Enter number" value={modalForm.number}
                            onBlur={() => {
                              if (!validator.validateNumber(this.refs.number.value)){
                                this.showErrorNumberInput();
                              } else {
                                $('#number-form-group').removeClass('has-error has-feedback');
                                $('#input-number').next('.error-message').remove();
                              }
                            }}
                            onChange={()=>{
                              dispatch(actions.openModalForm({
                                ...modalForm,
                                number: this.refs.number.value
                              }));
                            }}/>
                      </div>
                    </div>
    </form>
</div>
<div className="modal-footer">
<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.cleanUpErrorMessage}>Close</button>
<button id="submit-button" type="submit" className="btn btn-primary" onClick={this.handleSubmitModal}>Save</button>
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
)(ModalForm);
