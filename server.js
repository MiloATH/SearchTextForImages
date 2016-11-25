var path = require('path');
var search = require('node-google-image-search');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var history = [];

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

//Search
app.get('/api/imagesearch/:text',function(req,res){
    var offset = req.query.offset || 0;
    var searchText = decodeURI(req.params.text);
    history.push({"term":searchText,"when":new Date()});
    search(searchText,function(images){
        console.log(images);
        res.json(images);
    },offset,10);
})

app.listen(PORT, function() {
    console.log('Image Search listening on port '+PORT);
});