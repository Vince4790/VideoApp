var $ = require('jquery');
var actions = require('actions');
var store = require('configureStore').configure();

$(function() {
    // window.onunload = function() {
    //     localStorage.clear();
    //     return '';
    // };

  $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

  $('#login-form').on('submit', (e) => {
    e.preventDefault();
    var email = $('#login-form-email').val();
    var password = $('#login-form-password').val();

    store.dispatch(actions.loginWithEmailPassword(email,password));
  });

  $('#register-form').on('submit', (e) => {
    e.preventDefault();
    var email = $('#register-form-email').val();
    var confirmPassword = $('#register-form-confirm-password').val();
    var password = $('#register-form-password').val();

    if (confirmPassword === password){
      store.dispatch(actions.createUserWithEmailPassword(email, password));
    } else {
      alert('Please enter password again!');
    }
  });

});
