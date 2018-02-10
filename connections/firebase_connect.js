var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyCYBOU-APrFnJW5atcOzoWRCf4qy3YO5gc",
    authDomain: "rainbow-restaurant.firebaseapp.com",
    databaseURL: "https://rainbow-restaurant.firebaseio.com",
    projectId: "rainbow-restaurant",
    storageBucket: "rainbow-restaurant.appspot.com",
    messagingSenderId: "17117575531"
};
firebase.initializeApp(config);

module.exports = firebase;