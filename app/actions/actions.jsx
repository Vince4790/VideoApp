import firebase, {firebaseRef, provider} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
}

export var addContact = (contact) => {
  return {
    type: 'ADD_CONTACT',
    contact
  };
};

export var updateContact = (contact) => {
  return {
    type: 'UPDATE_CONTACT',
    contact
  }
}

export var toggleCheck = (id) => {
  return {
    type: 'TOGGLE_CHECK',
    id
  }
}

export var openModalForm = (modalForm) => {
  return {
    type: 'OPEN_MODAL',
    modalForm
  }
}

export var startAddContact = (contact) => {
  return (dispatch, getState) => {
    var newContact = {
      name: contact.name,
      number: contact.number
    };
    var uid = getState().auth.uid;
    var contactRef = firebaseRef.child(`users/${uid}/contacts`).push(newContact);

    return contactRef.then(() => {
      dispatch(addContact({
        ...newContact,
        checked: false,
        id: contactRef.key
      }));
    });
  };
};

export var addContacts = (contacts) => {
  return {
    type: 'ADD_CONTACTS',
    contacts
  };
};

export var notifyAddVideosDone = () => {
  return {
    type: 'ADD_VIDEOS_DONE'
  };
};

export var startAddContacts = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var contactsRef = firebaseRef.child(`users/${uid}/contacts`);

    return contactsRef.once('value').then((snapshot) => {
      var contacts = snapshot.val() || {};
      var parsedContacts = [];

      Object.keys(contacts).forEach((contactId) => {
        parsedContacts.push({
          id: contactId,
          ...contacts[contactId]
        });
      });

      dispatch(addContacts(parsedContacts));
      dispatch(notifyAddVideosDone());
    });
  };
};

export var removeAll = () => {
  return {
    type: 'REMOVE_ALL'
  };
};

export var removeSelected = () => {
  return {
    type: 'REMOVE_SELECTED'
  };
};

export var removeContact = (id) => {
  return {
    type: 'REMOVE_CONTACT',
    id
  };
};

export var sortByNameAsc = () => {
  return {
    type: 'SORT_NAME_ASC'
  };
};

export var sortByNameDesc = () => {
  return {
    type: 'SORT_NAME_DESC'
  };
};

export var startRemoveAll = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var contactRef = firebaseRef.child(`users/${uid}/contacts`).remove();

    return contactRef.then(() => {
      dispatch(removeAll());
    });
  };
};

export var startRemoveSelected = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var contacts = getState().contacts;
    var filteredContacts = contacts.filter((contact) => {
      return contact.checked;
    });
    var removedContacts = {};
    for (var i in filteredContacts){
      var key = filteredContacts[i].id;
      removedContacts[key] = null;
    }
    var contactRef = firebaseRef.child(`users/${uid}/contacts`).update(removedContacts);

    return contactRef.then(() => {
      dispatch(removeSelected());
    });
  };
};

export var startUpdateContact = (contact) => {
  return (dispatch, getState) => {
      var uid = getState().auth.uid;
      var contactRef = firebaseRef.child(`users/${uid}/contacts/${contact.id}`).update({
        name: contact.name,
        number: contact.number
      });

      return contactRef.then(() => {
        dispatch(updateContact(contact));
      });
  };
};

export var startRemoveContact = (id) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var contactRef = firebaseRef.child(`users/${uid}/contacts/${id}`).remove();

    return contactRef.then(() => {
      dispatch(removeContact(id));
    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var createUserWithEmailPassword = (email, password) => {
  return (dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result) => {
      console.log('Register worked!', result);
    }, (error) => {
      console.log('Unable to register', error.message);
      alert(error.message);
    });
  }
}

export var loginWithEmailPassword = (email, password) => {
  return (dispatch, getState) => {
    console.log('Log with email');
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      console.log('Auth worked!', result);
    }, (error) => {
      console.log('Unable to auth', error);
      alert(error.message);
    });
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out!');
    });
  };
};
