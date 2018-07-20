var io = require('socket.io').listen(3000); //3000 portunu dinlemeye başladık.
console.log("Successfull, now you can browse index.html!");
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