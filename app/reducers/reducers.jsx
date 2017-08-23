var VideoAPI = require('VideoAPI');

export var searchTextReducer = (state = '', action) => {
  switch (action.type){
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var sortReducer = (state = 'SORT_NAME_ASC', action) => {
  switch (action.type) {
    case 'SORT_NAME_DESC':
      return 'SORT_NAME_DESC';
      case 'SORT_NAME_ASC':
        return 'SORT_NAME_ASC';
    default:
      return state;
  }
}

export var modalFormReducer = (state = {}, action) => {
  switch (action.type){
    case 'OPEN_MODAL':
     return action.modalForm;
    default:
      return state;
  };
};

export var uploadFormReducer = (state = {}, action) => {
  switch (action.type){
    case 'OPEN_UPLOAD':
     return action.modalForm;
    default:
      return state;
  };
};

export var loadVideoNotificationReducer = (state = false, action) => {
  switch (action.type){
    case 'ADD_VIDEOS_DONE':
      console.log(action);
     return true;
    default:
      return state;
  };
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export var videosReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_VIDEOS':
      console.log(action);
      return [
        ...state,
        ...action.videos
      ];
    case 'REMOVE_VIDEO':
      return state.filter((video) => {
        return video.id !== action.id;
      });
    case 'ADD_VIDEO':
      return [
        ...state,
        {
          id: action.video.id,
          name: action.video.name,
          url: action.video.url,
          checked: false
        }
      ];
    case 'REMOVE_ALL':
      return [];
    case 'UPDATE_VIDEO': {
      return state.map((video) => {
        if (video.id === action.video.id){
          return {
            ...action.video
          }
        } else {
          return video;
        }
      });
    }
    case 'REMOVE_SELECTED':
      return state.filter((video) => {
        return !video.checked;
      });
    case 'TOGGLE_CHECK':
      return state.map((video) => {
        if (video.id === action.id){
          var toggleChecked = !video.checked;

          return {
            ...video,
            checked: toggleChecked
          }
        } else {
          return video;
        }
      });
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};
