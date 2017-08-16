import firebase from 'firebase';

try{
  var config = {
    apiKey: "AIzaSyDzkWXj6JwJvksxyoc3XKP1Z_nz-SNiz_w",
    authDomain: "phoneapp-7236e.firebaseapp.com",
    databaseURL: "https://phoneapp-7236e.firebaseio.com",
    projectId: "phoneapp-7236e",
    storageBucket: "phoneapp-7236e.appspot.com",
    messagingSenderId: "433648982430"
  };
  firebase.initializeApp(config);
} catch (e){

}

export var provider = new firebase.auth.GoogleAuthProvider();
export var firebaseRef =  firebase.database().ref();
export default firebase;
