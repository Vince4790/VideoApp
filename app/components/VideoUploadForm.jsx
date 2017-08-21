var React = require('react');
var {connect} = require('react-redux');
var VideoFileAPI = require('VideoFileAPI');
var validator = require('validator');
var $ = require('jquery');

var VideoUploadForm = React.createClass({
  cleanUpErrorMessage: function(){
    $('#upload-form-video-name').removeClass('has-error has-feedback');
    $('#upload-form-video-name').next('.error-message').remove();
    $('#file-input').removeClass('has-error has-feedback');
    $('#file-input').next('.error-message').remove();
  },
  showErrorNameInput: function(){
    $('#upload-form-video-name').addClass('has-error has-feedback');
    if ($('#upload-form-video-name').next('.error-message').length === 0){
      $('#upload-form-video-name').after("<div class='error-message' style='color:red;margin-left:15px'>Please enter valid name</div>");
    }
  },
    showErrorFileNameInput: function(){
        $('#file-input').addClass('has-error has-feedback');
        if ($('#file-input').next('.error-message').length === 0){
            $('#file-input').after("<div class='error-message' style='color:red;margin-left:15px'>Please enter valid name</div>");
        }
    },
  handleSubmitModal: function(e){
    e.preventDefault();
    var name = $("#upload-form-video-name").val();
    if (!name) {
        this.showErrorNameInput();
    }

    var fileName = document.getElementById('file-input').value;
    if (!fileName) {
      this.showErrorFileNameInput();
    }
    if (name && fileName) {
        var file = document.getElementById('file-input').files[0];
        var extension = fileName.substr((fileName.lastIndexOf('.') + 1));
        var videoName = $("#upload-form-video-name").val();
        VideoFileAPI.splitAndEncryptFile(file, videoName, extension);
    }
  },
  render: function(){
    return (
        <div id="video-modal" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"
                        onClick={this.cleanUpErrorMessage}>&times;</button>
                <h4 className="modal-title" style={{color: 'deepskyblue'}}>New Video</h4>
              </div>
              <div className="modal-body">
                <form id="upload-form" className="form-horizontal" role="form" action="/">
                  <div className="form-group input-name">
                    <input type="text" id="upload-form-video-name" style={{marginLeft: '15px', width: '80%'}}
                           tabIndex="1" className="form-control" placeholder="Enter video name" required/>
                  </div>
                  <div className="form-group">
                    <input type="file" name="video" id="file-input" style={{marginLeft: '15px'}} accept="video/*"/>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6 col-sm-offset-5" style={{paddingLeft: '0'}}>
                        <input type="submit" id="upload-submit" className="btn btn-register" value="Upload Video"
                               onClick={this.handleSubmitModal} required/>
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