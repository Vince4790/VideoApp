var React = require('react');
import * as Redux from 'react-redux';

import VideoList from 'app/components/VideotList';
import VideoPlayerModal from 'VideoPlayerModal';
import VideoUploadForm from 'VideoUploadForm';
import ConfirmForm from 'ConfirmForm';
import Nav from 'Nav';

export var VideoApp = React.createClass({
  render: function(){
    return (
      <div>
      <Nav/>
      <section>
        <VideoPlayerModal/>
        <VideoUploadForm/>
        <ConfirmForm/>
        <VideoList/>
      </section>
      </div>
    )
  }
});

export default Redux.connect()(VideoApp);
