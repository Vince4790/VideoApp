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
    $('video')[0].pause();
    $('video')[0].currentTime = 0;
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

    <div className="modal fade" id="contact-modal" tabIndex="-1" role="dialog" aria-labelledby="modal-video-label">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.cleanUpErrorMessage}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="modal-video">
                    <div>
                        <video controls>
                            <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                    </div>
                </div>
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
