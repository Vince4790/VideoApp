var $ = require('jquery');
var actions = require('actions');
var {hashHistory} = require('react-router');
const AUTHENTICATION_URL = "http://localhost:8080/login";

module.exports = {
    loginWithEmailAndPassword: function(email,password, dispatch){
        $.ajax({
            url: AUTHENTICATION_URL,
            dataType: "json",
            type: "POST",
            async:false,
            crossDomain: true,
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(email + ":" + password)
            },
            success: function(data){
                localStorage.setItem("userId", data.id);
                localStorage.setItem("authorization", btoa(email + ":" + password));
                console.log(localStorage);
                dispatch(actions.login(data.id));
                hashHistory.push('/contacts');
            },
            error: function(){
                console.log("Unauthorized!!");
            }
        });
        // var headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Authorization': 'Basic ' + btoa(email + ":" + password)
        // }
        // axios.get(AUTHENTICATION_URL, null, headers).then(() => {
        //     console.log('Success');
        // }).catch((error) =>{
        //     console.log("Error !!");
        // });
    },
    createUserWithEmailAndPassword: function(email,password){

    },
    logoutAndClearSession: function(){
        localStorage.clear();
    }
};