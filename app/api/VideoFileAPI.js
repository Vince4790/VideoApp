var $ = require('jquery');
const CryptoJS = require('crypto-js');

const VIDEO_UPLOAD_API_URL = 'http://localhost:8080/api/video';
const VIDEO_MERGE_API_URL = 'http://localhost:8080/api/videos/merge';

module.exports = {
    splitAndEncryptFile: function(file, videoName, ext){
        var chunkSize = 5* 1024 * 1024; // 5 MB
        var fileSize = file.size;
        const chunks = Math.ceil(file.size/chunkSize,chunkSize);
        var chunk = 0;
        var uploadFile = this.uploadFile;
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
                uploadFile(currentData);
            };
            reader.readAsArrayBuffer(blob);
            chunk++;
        }
    },

    uploadFile: function(formData){
        const mergeFile = function(formData){
            $.ajax({
                url: VIDEO_MERGE_API_URL,
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                headers: {
                    "Authorization": "Basic " + localStorage.getItem("authorization"),
                },
                success: function(){
                    console.log('Merge success');
                },
                error: function(){
                    console.log('Upload failed!');
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
                    var mergeRequest = new FormData();
                    mergeRequest.append('videoName',formData.get('name'));
                    mergeRequest.append('chunks', formData.get('total'));
                    mergeRequest.append('ext', formData.get('ext'));

                    mergeFile(mergeRequest);
                }
            },
            error: function(){
                console.log('Upload failed!');
            }
        });
    },
};

