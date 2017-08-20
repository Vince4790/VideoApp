import * as redux from 'redux';
import thunk from 'redux-thunk';
var {searchTextReducer, contactsReducer, modalFormReducer, authReducer, sortReducer, loadVideoNotificationReducer,uploadFormReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    videos: contactsReducer,
    modalForm: modalFormReducer,
    auth: authReducer,
    sort: sortReducer,
    videosLoaded: loadVideoNotificationReducer,
    uploadForm: uploadFormReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
