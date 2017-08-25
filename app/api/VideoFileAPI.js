var $ = require('jquery');
var actions = require('actions');
const CryptoJS = require('crypto-js');
var config = require('config');

const VIDEO_UPLOAD_API_URL = config.VIDEO_SERVICE_HOST+'/api/video';
const VIDEOS_API_REMOVE_URL = config.VIDEO_SERVICE_HOST+'/api/videos/remove';
const VIDEOS_API_REMOVE_ALL_URL = config.VIDEO_SERVICE_HOST+'/api/videos/remove/all';
const VIDEO_MERGE_AND_UPLOAD_API_URL = config.VIDEO_SERVICE_HOST+'/api/video/upload';

module.exports = {
    splitAndEncryptFile: function(file, videoName, ext, dispatch){
        var chunkSize = 40 * 1024 * 1024; // 40 MB
        var fileSize = file.size;
        const chunks = Math.ceil(file.size/chunkSize,chunkSize);
        var chunk = 0;
        var uploadFileChunk = this.uploadFileChunk;
        var map = new Map();

        console.log('file size..',fileSize);
        console.log('chunks...',chunks);

        while (chunk < chunks) {
            var offset = chunk*chunkSize;
            var blob = file.slice(offset,offset + chunkSize);
            var reader = new FileReader();
            const current = chunk;
            var formData = new FormData();
            formData.append('file', blob);
            formData.append('name', videoName);
            formData.append('chunk', current);
            formData.append('total', chunks);
            formData.append('ext', ext);
            map.set(current, formData);


            reader.onloadend = function (e) {
                var wordArray = CryptoJS.lib.WordArray.create(e.target.result),
                    hash = CryptoJS.MD5(wordArray).toString();
                console.log("MD5 Checksum", hash, current);
                var currentData = map.get(current);
                currentData.append('checksum', hash);
                uploadFileChunk(currentData, dispatch);
            };
            reader.readAsArrayBuffer(blob);
            chunk++;
        }
    },

    removeSelectedVideos: function(ids){
        let formData = new FormData();
        formData.append('ids', JSON.stringify(ids));
        $.ajax({
            url: VIDEOS_API_REMOVE_URL,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            headers: {
                "Authorization": "Basic " + localStorage.getItem("authorization"),
            },
            success: function(){
                alert('Videos successfully removed');
            },
            error: function(){
                alert('Failed to remove videos');
            }
        });
    },

    removeAllVideos: function(){
        let formData = new FormData();
        $.ajax({
            url: VIDEOS_API_REMOVE_ALL_URL,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            headers: {
                "Authorization": "Basic " + localStorage.getItem("authorization"),
            },
            success: function(){
                alert('All videos successfully removed');
            },
            error: function(){
                alert('Failed to remove videos');
            }
        });
    },

    uploadFileChunk: function(formData, dispatch){
        const mergeAndUploadFile = function(formData, dispatch){
            $.ajax({
                url: VIDEO_MERGE_AND_UPLOAD_API_URL,
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                headers: {
                    "Authorization": "Basic " + localStorage.getItem("authorization"),
                },
                success: function(data){
                    alert('Upload successfully');
                    dispatch(actions.addVideo(data));
                    actions.doneUpload();
                },
                error: function(){
                    actions.doneUpload();
                    alert('Upload failed!');
                }
            });
        };

        $.ajax({
            url: VIDEO_UPLOAD_API_URL,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            headers: {
                "Authorization": "Basic " + localStorage.getItem("authorization"),
            },
            success: function(status){
                if (status === 'Completed'){
                    var request = new FormData();
                    request.append('videoName',formData.get('name'));
                    request.append('chunks', formData.get('total'));
                    request.append('ext', formData.get('ext'));

                    mergeAndUploadFile(request, dispatch);
                }
            },
            error: function(){
                actions.doneUpload();
                alert('Upload failed!');
            }
        });
    },
};

