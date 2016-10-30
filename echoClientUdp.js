var dgram = require('dgram');
var clientSocket = dgram.createSocket('udp4');
var index = 0;

function sendMsg()
{
    var temperture = (Math.random() * 40).toFixed(2);
    var humidity = (Math.random() * 100).toFixed(2);
    var x = Math.ceil((Math.random() * 1000));
    var y = Math.ceil((Math.random() * 1000));
    var z = Math.ceil((Math.random() * 1000));
    var msg;

    if (index == 0)
    {
        msg = `A01wd${temperture}sd${humidity}%B`;
        index++;
    }
    else {
        msg = `A42X${x}Y${y}Z${z}B`
        index = 0
    }

    clientSocket.send(msg, 0, msg.length, 5683);
}

//start a timer to send message to echoServer
setInterval(sendMsg, 2000);

clientSocket.on('message', function (msg, rinfo)
{
    console.log('recv %s(%d) from server', msg, msg.length);
});

clientSocket.on('error', function (err)
{
    console.log('error, msg - %s, stack - %s', err.message, err.stack);
});

clientSocket.bind(54321);
