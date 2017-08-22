var React = require('react');
import * as Redux from 'react-redux';

import ContactList from 'ContactList';
import VideoPlayerModal from 'VideoPlayerModal';
import VideoUploadForm from 'VideoUploadForm';
import ConfirmForm from 'ConfirmForm';
import Nav from 'Nav';

export var PhoneBookApp = React.createClass({
  render: function(){
    return (
      <div>
      <Nav/>
      <section>
        <VideoPlayerModal/>
        <VideoUploadForm/>
        <ConfirmForm/>
        <ContactList/>
      </section>
      </div>
    )
  }
});

export default Redux.connect()(PhoneBookApp);
