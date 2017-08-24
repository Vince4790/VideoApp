var $ = require('jquery');
var actions = require('actions');
var config = require('config');
const VIDEO_API_URL = config.VIDEO_SERVICE_HOST+'/api/videos';

module.exports = {
  filterVideos: function(videos, searchText, sort){
    var filteredVideos = videos;

    filteredVideos = filteredVideos.filter((video) => {

      var nameLowerCase = video.name.toLowerCase();

      return searchText.length === 0 || nameLowerCase.indexOf(searchText) > -1
              || video.name.indexOf(searchText) > -1;
    });

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
                dispatch(actions.addVideos(videos));
                dispatch(actions.notifyAddVideosDone());
            },
            error: function(){
                console.log("Failed to load videos");
            }
        });
    },
};
