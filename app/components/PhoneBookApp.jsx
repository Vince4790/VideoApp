var React = require('react');
import * as Redux from 'react-redux';

import Contact from 'Contact';
import ContactSearch from 'ContactSearch';
import ContactList from 'ContactList';
import ModalForm from 'ModalForm';
import ConfirmForm from 'ConfirmForm';
import Nav from 'Nav';

export var PhoneBookApp = React.createClass({
  render: function(){
    return (
      <div>
      <Nav/>
      <section>
        <ModalForm/>
        <ConfirmForm/>
        <ContactList/>
      </section>
      </div>
    )
  }
});

export default Redux.connect()(PhoneBookApp);
