var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var VideoFileAPI = require('VideoFileAPI');
var validator = require('validator');
var actions = require('actions');
var $ = require('jquery');

var VideoUploadForm = React.createClass({
    cleanUpBeforeExit: function(){
      this.cleanUpErrorMessage();
      actions.doneUpload();
    },
  cleanUpErrorMessage: function(){
    $('#upload-form-video-name').removeClass('has-error has-feedback');
    $('#upload-form-video-name').next('.error-message').remove();
    $('#file-input').removeClass('has-error has-feedback');
    $('#file-input').next('.error-message').remove();
  },
  showErrorNameInput: function(error){
    $('#upload-form-video-name').addClass('has-error has-feedback');
    if ($('#upload-form-video-name').next('.error-message').length > 0){
        $('#upload-form-video-name').next('.error-message').remove();
    }
    $('#upload-form-video-name').after("<div id='video-name-error' class='error-message' style='color:red;margin-left:15px'></div>");
    $('#video-name-error').text(error);
  },
    showErrorFileNameInput: function(error){
        $('#file-input').addClass('has-error has-feedback');
        if ($('#file-input').next('.error-message').length > 0){
            $('#file-input').next('.error-message').remove();
        }
        $('#file-input').after("<div id='file-input-error' class='error-message' style='color:red;margin-left:15px'></div>");
        $('#file-input-error').text(error);
    },
  handleSubmitModal: function(e){
    e.preventDefault();

    var {dispatch} = this.props;
    var videoName = $("#upload-form-video-name").val();
    if (!videoName) {
        this.showErrorNameInput('Please enter video name');
    }

    var fileName = document.getElementById('file-input').value;
    var file = document.getElementById('file-input').files[0];
    var extension = fileName.substr((fileName.lastIndexOf('.') + 1));

    if (!fileName) {
      this.showErrorFileNameInput('Please choose a video');
    } else if (extension !== 'mp4' && extension !== 'webm' && extension !== 'mov' && extension !== 'avi'){
      this.showErrorFileNameInput('Only mp4,mov,webm,avi files allowed');
    } else if (file.size > 500 * 1024 * 1024){
      this.showErrorFileNameInput('File cannot exceed 500 MB');
    } else if (videoName) {
        this.cleanUpErrorMessage();
        actions.onUpload();
        VideoFileAPI.splitAndEncryptFile(file, videoName, extension, dispatch);
    }
  },
  render: function(){
    return (
        <div id="video-modal" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"
                        onClick={this.cleanUpBeforeExit}>&times;</button>
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
                        <input type="button" id="upload-submit" className="btn btn-register" value="Upload Video"
                               onClick={this.handleSubmitModal} required/>
                        <i id="spinner" className="fa fa-spinner fa-spin" style={{fontSize:'55px', display:'none'}}></i>
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