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

//History
app.get('/api/history',function(req,res){
    res.send(JSON.stringify(history));
})

//Search
app.get('/api/imagesearch/:text',function(req,res){
    var offset = req.query.offset || 0;
    var searchText = decodeURI(req.params.text);
    history.unshift({"term":searchText,"when":new Date()});
    if(history.length>10){
        history.pop();
    }
    search(searchText,function(images){
        //console.log(images);
        var ret = [];
        for(var i=0;i<images.length;i++){
            ret.push({
                "url": images[i].link,
                "snippet": images[i].snippet,
                "thumbnail": images[i].image.thumbnailLink,
                "context": images[i].image.contextLink
            })
        }
        res.end(JSON.stringify(ret));
    },offset,10);
})

app.listen(PORT, function() {
    console.log('Image Search listening on port '+PORT);
});