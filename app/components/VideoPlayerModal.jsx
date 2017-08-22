var React = require('react');
var {connect} = require('react-redux');
var $ = require('jquery');

var VideoPlayerModal = React.createClass({
    cleanUpErrorMessage: function(){
        $('video')[0].pause();
        $('video')[0].currentTime = 0;
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
                            <div>
                                <video id="video-modal-player" className="video-js vjs-default-skin"
                                       style={{width: '550', height: '400', margin: 'auto'}} controls>
                                    <source id="video-modal-source" src={modalForm.url} type="video/mp4"/>
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