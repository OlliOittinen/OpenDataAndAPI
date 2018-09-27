const express = require('express');
const mysql = require('mysql');
const app = express();

/*
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "jokes"
});
*/
app.get('/', function (req, res) {
    res.sendFile("home.html", {root: __dirname});
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
