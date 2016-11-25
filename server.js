var path = require('path')
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

//home
app.get('/', function(req, res) {
    var file = path.join(__dirname, 'index.html');
    res.sendFile(file, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});
