import {firebaseRef} from 'app/firebase/';
var {hashHistory} = require('react-router');
var AuthenticationAPI = require('AuthenticationAPI');
var ContactAPI = require('ContactAPI');
var VideoFileAPI = require('VideoFileAPI');

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

export var openUploadForm = (modalForm) => {
  return {
    type: 'OPEN_UPLOAD',
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

export var addVideos = (videos) => {
  console.log(videos);
  return {
    type: 'ADD_CONTACTS',
      videos
  };
};

export var notifyAddVideosDone = () => {
  return {
    type: 'ADD_VIDEOS_DONE'
  };
};

export var startAddContacts = () => {
  return (dispatch, getState) => {
    ContactAPI.getVideosByCurrentUser(dispatch);
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
    VideoFileAPI.removeAllVideos();
    dispatch(removeAll());
  };
};

export var startRemoveSelected = (videos) => {
  return (dispatch, getState) => {
    var selected = videos.filter((video)=>{
      return video.checked;
    }).map((video)=>{
      return video.id;
    });
    // for (var video in videos){
    //   console.log(video.checked);
    //   if (video.checked){
    //     selected.push(video.id);
    //   }
    // }
    console.log(selected);
    VideoFileAPI.removeSelectedVideos(selected);
    dispatch(removeSelected());
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
      AuthenticationAPI.createNewUserWithEmailAndPassword(email,password);
  }
}

export var loginWithEmailPassword = (email, password) => {
  return (dispatch, getState) => {
    console.log('Log with email');
    AuthenticationAPI.loginWithEmailAndPassword(email, password, dispatch);
  };
};

export var startLogout = () => {
    return (dispatch, getState) => {
        localStorage.clear();
        dispatch(logout());
        hashHistory.push('/');
    };
};
