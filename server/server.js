/*const http = require('http');
var twitterApiCall = require('./twitterApiCall.js');

const server = http.createServer(function (req, res) {
  res.end();
  console.log("started");
});
twitterApiCall.getOauth();

server.on('clientError', function (err, socket) {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(3006);*/

var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

app.use(cors());

app.get('*', function(req, res, next){
  res.sendFile(path.join(__dirname+'/../index.html'));
});

app.listen(3005, function(){
  console.log('CORS-enabled web server listening on port 3005');
});
