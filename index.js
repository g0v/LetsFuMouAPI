var express = require('express');
var fs      = require('fs');
var PHJson  = require('./doc/publichearing.json');

var app = express();

var v = '1.0';

for (var i = PHJson.length - 1; i >= 0; i--) {
    for (var j = PHJson[i].data.length - 1; j >= 0; j--) {
        var fileName = PHJson[i].data[j].content;
        if (fs.existsSync('./doc/' + fileName)) {
            var content = fs.readFileSync('./doc/' + fileName, 'utf8');
            PHJson[i].data[j].content = content;
        }
    };
};


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});

app.get('/api/' + v + '/all', function (req, res) {
    var showData = PHJson;
    for (var key in req.query){
        showData = PHJson.filter(function(entry){
            var tmpEntry = entry[key];
            if (Object.prototype.toString.apply(tmpEntry) === '[object Array]') {
                return tmpEntry.indexOf(req.query[key]) >= 0;
            }
            else {
                return entry[key] == req.query[key];
            }
        });
    }

    res.send(showData);
});

var port = Number(process.env.PORT || 5000);
app.listen(port);
