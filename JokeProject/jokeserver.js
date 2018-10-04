const express = require('express');
const firebase = require('firebase');
const admin = require("firebase-admin");
const app = express();
const serviceAccount = require("../JokeProject/joke-api-firebase-adminsdk.json");

var config = {
    apiKey: "AIzaSyCYqbAvdsQ_tYh77TaxmL2dDUeNhMKQpgA",
    authDomain: "joke-api-578e4.firebaseapp.com",
    databaseURL: "https://joke-api-578e4.firebaseio.com",
    projectId: "joke-api-578e4",
    storageBucket: "joke-api-578e4.appspot.com",
    messagingSenderId: "1068760777389"
};
firebase.initializeApp(config);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://joke-api-578e4.firebaseio.com/"
});

app.get('/', function (req, res) {
    res.sendFile("home.html", {root: __dirname});
});

app.get('/SubmitJoke', function (req, res) {
    res.sendFile("submit_joke.html", {root: __dirname});
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/Bar', function (req, res) {
    var fbref = firebase.database().ref('/categories/Bar');
    fbref.on("value", function (snapshot) {
        res.send(snapshot.val()); //suoraan JSON muotoinen kakka
    })
});