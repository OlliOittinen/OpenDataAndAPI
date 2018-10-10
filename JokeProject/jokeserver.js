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

var fbref = firebase.database().ref('/categories/');

app.get('/', function (req, res) {
    res.sendFile("home.html", {root: __dirname});
});

app.get('/SubmitJoke', function (req, res) {
    res.sendFile("submit_joke.html", {root: __dirname});
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port)
});

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        //hae json objektin tiedot, tallenna muuttujaan
        var item = childSnapshot.val();
        //tämän objektin avain saa saman arvon kuin objektin avain
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};

app.get('/Jokes', async function (req, res) {
    let category = req.query.category;
    fbref = firebase.database().ref('/categories/' + category);
    fbref.once("value", function (snapshot) {
        var array = snapshotToArray(snapshot);
        res.send(array);
    })
});

app.get('/Submit', function (req, res) {
    let category = req.query.category;
    let joke = req.query.joke;
    firebase.database().ref('categories/' + category).push({
        joke: joke,
        likes: 0,
    });
    res.send("Joke submitted!");
});

app.get('/Vote', function (req, res) {

    let jokeKey = req.query.jokeKey;
    let integer = parseInt(req.query.integer);
    var valueToSend = 0;
    var fbref = firebase.database().ref('/categories/');
    var currentVotes = 0;

    fbref.orderByKey().on("child_added", function (snapshot) {
        snapshot.forEach(function (data) {
            if (jokeKey === data.key) {
                currentVotes = data.child("likes").val();
                fbref = firebase.database().ref('/categories/' + snapshot.key + '/' + data.key);
                var newValue = currentVotes + integer;
                valueToSend = newValue;
                fbref.update({
                    likes: newValue
                });
                res.send("" + valueToSend);
            }
        })
    });
});

app.get('/Delete', function (req, res) {
    let jokeKey = req.query.jokeKey;
    var fbref = firebase.database().ref('/categories/');

    fbref.orderByKey().on("child_added", function (snapshot) {
        snapshot.forEach(function (data) {
            if (jokeKey === data.key) {
                fbref = firebase.database().ref('/categories/' + snapshot.key);
                fbref.child(jokeKey).remove();
                res.send("Deleted!");
            }
        })
    });
});

app.get('/Login', function (req, res) {
    res.sendFile("signin.html", {root: __dirname});
});