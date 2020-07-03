var express        = require('express');
var http           = require('http');

var app            = express();
var path           = require('path');

app.set( 'port', process.env.PORT || 3001 );
app.get('/', function (req, res) {
    //res.send('Hello World');
    res.sendFile(path.join(__dirname + '/index.html'));
});

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});