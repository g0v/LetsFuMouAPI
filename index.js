var express = require('express');

var config    = require('./lib/config');
// var loader    = require('./lib/loader');
// var dbClient  = require('./lib/db');
var app = express();

var v = '1.0';
var period = 1000 * 60 * 60;  // 1hr


// setInterval(function () {
//    loader.run();
//     tagloader.run();

// }, period);

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.get('/api/' + v + '/example', function (req, res) {
    res.send(config.example);
});

var port = Number(process.env.PORT || 5000);
app.listen(port);
