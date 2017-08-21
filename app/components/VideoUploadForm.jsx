var React = require('react');
var {connect} = require('react-redux');
var VideoFileAPI = require('VideoFileAPI');
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
    var file = document.getElementById('file-input').files[0];
    var fileName = document.getElementById('file-input').value;
    var extension = fileName.substr( (fileName.lastIndexOf('.') +1) );
    var videoName = $("#upload-form-video-name").val();
    VideoFileAPI.splitAndEncryptFile(file,videoName, extension);
  },
  render: function(){
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
                      <input type="file" name="video" id="file-input"  style={{marginLeft:'15px'}} accept="image/*" />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6 col-sm-offset-5" style={{paddingLeft:'0'}}>
                        <input type="submit" id="upload-submit" className="btn btn-register" value="Upload Video" onClick={this.handleSubmitModal} required/>
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