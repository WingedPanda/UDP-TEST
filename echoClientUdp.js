var dgram = require('dgram');
 
var clientSocket = dgram.createSocket('udp4');
 
var messages = [
/*   'temperture:27',
  'Are you OK?',
  'I am happy.',
  'A little panda found a pumpkin.' */
    'A01wd024.0sd069.6%B'
    'A42X+01710Y-02898Z-16846B'
];
 
var index = 0;
 
function sendMsg(){//send to server
  var msg = messages[index];
  index = index + 1;
  if(index == messages.length){
    index = 0;
  }
  clientSocket.send(msg, 0, msg.length, 5683);
}
 
//start a timer to send message to echoServer
setInterval(sendMsg, 2000);
 
clientSocket.on('message', function(msg, rinfo){
      console.log('recv %s(%d) from server', msg, msg.length);
    });
 
clientSocket.on('error', function(err){
      console.log('error, msg - %s, stack - %s', err.message, err.stack);
    });
 
clientSocket.bind(54321);