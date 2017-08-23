var $ = require('jquery');
var actions = require('actions');
var {hashHistory} = require('react-router');
const AUTHENTICATION_LOGIN_URL = "http://localhost:8080/login";
const AUTHENTICATION_REGISTER_NEW_URL = 'http://localhost:8080/user/create';

module.exports = {
    loginWithEmailAndPassword: function(email,password, dispatch){
        $.ajax({
            url: AUTHENTICATION_LOGIN_URL,
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
                hashHistory.push('/videos');
            },
            error: function(){
                alert('Failed to login ! Please check your username or password');
            }
        });
    },

    createNewUserWithEmailAndPassword: function(email, password){
        let formData = new FormData();
        formData.append('username', email);
        formData.append('password', btoa(email + ":" + password));
        $.ajax({
            url: AUTHENTICATION_REGISTER_NEW_URL,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(){
                alert('User created successfully');
            },
            error: function(e){
                console.log(e);
                alert(e.message);
            }
        });
    }
};