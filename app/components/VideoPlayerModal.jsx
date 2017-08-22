var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var validator = require('validator');
var $ = require('jquery');

var VideoPlayerModal = React.createClass({
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
    render: function(){
        var {modalForm} = this.props;
        console.log(modalForm);
        return (

            <div className="modal fade" id="player-modal" tabIndex="-1" role="dialog" aria-labelledby="modal-video-label">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.cleanUpErrorMessage}>
                                <span>&times;</span>
                            </button>
                            <h4 className="modal-title" style={{color: 'deepskyblue'}}>{modalForm.title}</h4>
                        </div>
                        <div className="modal-body" style={{width:'auto',height:'auto'}} >
                            <div className="modal-video">
                                <video className="video-js vjs-default-skin" style={{width:'550',height:'400',margin:'auto'}} controls>
                                    <source src="https://s3-ap-southeast-1.amazonaws.com/video-upload-vince/myvideo.mp4"
                                            type="video/mp4"/>
                                    Your browser does not support HTML5 video.
                                </video>
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
)(VideoPlayerModal);