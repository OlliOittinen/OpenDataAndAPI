const express = require('express');
const mysql = require('mysql');
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "rajapinnat"
});

app.get('/', function (req, res) {
    res.sendFile("events.html", {root: __dirname});
});

app.get('/dates', function (req, res) {
    var start = "'" + req.query.start.replace(/-/g, "/") + "'"; //lisää hipsut ja vaihda (-) merkki (/) merkiksi koska sql
    var end = "'" + req.query.end.replace(/-/g, "/") + "'";

    var sql = "SELECT event_date.Date, event.Name, event.Type, location.Location_name"
        + " FROM event_date, event, location"
        + " WHERE event_date.Event_id = event.Event_id and event.Location_Location_id = location.Location_id"
        + " and event_date.Date BETWEEN " + start + " and " + end + ";";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

con.connect(function (err) {
    if (err) throw err;

    var sql = "SELECT event_date.Date, event.Name, event.Type, location.Location_name"
        + " FROM event_date, event, location"
        + " WHERE event_date.Event_id = event.Event_id and event.Location_Location_id = location.Location_id"
        // + " and event_date.Date >= ? and event_date.Date <= ?"
        + " GROUP BY Name"
        + " ORDER BY event_date.Date";

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        app.get('/', function (req, res) {
            res.send(result);
        });
    });
});