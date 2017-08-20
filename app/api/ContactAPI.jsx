var $ = require('jquery');
var actions = require('actions');
const VIDEO_API_URL = 'http://localhost:8080/api/videos';

module.exports = {
  setContacts: function(contacts){
    if ($.isArray(contacts)){
      return contacts;
    }
  },
  sortByNameAsc: function(a,b){
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  },
  sortByNameDesc: function(a,b){
    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    } else {
      return 0;
    }
  },
  filterVideos: function(videos, searchText, sort){
    var filteredVideos = videos;

    filteredVideos = filteredVideos.filter((video) => {

      var nameLowerCase = video.name.toLowerCase();

        console.log('filetered',nameLowerCase);
      return searchText.length === 0 || nameLowerCase.indexOf(searchText) > -1
              || video.name.indexOf(searchText) > -1;
    });

    if (sort === 'SORT_NAME_ASC'){
      filteredVideos.sort(this.sortByNameAsc);

    } else if (sort === 'SORT_NAME_DESC'){
      filteredVideos.sort(this.sortByNameDesc);

    }

    return filteredVideos;
    },
    getVideosByCurrentUser: function(dispatch){
        $.ajax({
            url: VIDEO_API_URL,
            dataType: "json",
            type: "GET",
            async:false,
            crossDomain: true,
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization": "Basic " + localStorage.getItem("authorization")
            },
            success: function(videos){
                console.log(videos);
                // var parsed = [];
                // videos.forEach((video)=>{
                //   parsed.push(JSON.parse(video));
                // });
                dispatch(actions.addVideos(videos));
                dispatch(actions.notifyAddVideosDone());
            },
            error: function(){
                console.log("Failed to load videos");
            }
        });
    },
};
