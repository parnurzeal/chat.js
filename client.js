var socket = require('socket.io-client').connect('http://localhost:8000');
var readline = require('readline'),
    cmdRead = readline.createInterface(process.stdin, process.stdout);

var username = '';

function print(msg){
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg);
  cmdRead.prompt(true);
}

cmdRead.on('line', function(line){
  socket.emit('send', username + ': ' + line );
  cmdRead.prompt(true);
});

socket.on('connect',function(){
  print('connect to chat');
  cmdRead.question("User: ", function(name){
    username = name;
    var msg = username + " has joined";
    socket.emit('send', msg);
    cmdRead.prompt(true);
  });
});

socket.on('message', function(data){
  print(data);
});

