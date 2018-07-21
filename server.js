var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(8080, function(){
    console.log('listening on *:8080');
    io.sockets.on('connection', function(socket){ 
        socket.on('makeEstimate', function(data){ 
            socket.emit('estimate', data) 
            socket.broadcast.emit('estimate', data) 
        });

        socket.on('userLogin', function(data){ 
            socket.emit('appInfo', data) 
            socket.broadcast.emit('appInfo', data) 
        });
    });
});