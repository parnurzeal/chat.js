var io = require('socket.io').listen(8000);

io.sockets.on('connection', function(socket){
  socket.on('send', function(data){
    io.sockets.emit('message', data);
    console.log(data);
  });
});




