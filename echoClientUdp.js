var dgram = require('dgram');
var clientSocket = dgram.createSocket('udp4');
var sensortype1 = 101;
var sensortype2 = 501;
var sensortype3 = 701;
var sensortype4 = 601;
var sensortype5 = 801;
var x = 100;
var y = 100;
var z = 100;
var value = 0;

function sendMsgDisplacementAndVerticality()
{	
    var displacement = 17;
	var verticality = 90;
	var msg;
	
    if(sensortype1 === 101 || sensortype1 === 102 || sensortype1 === 103 || sensortype1 === 104)
    {
        displacement += Math.random() - 0.5;
        if (displacement > 50)
        {
            displacement = 50;
        }
        else if (displacement < 0)
        {
            displacement = 0;
        }
        displacement = Math.round(displacement * 100) / 100;
		msg = `A0${sensortype1}WY${displacement}B`;
		sensortype1 ++;
		if (sensortype1 === 105) 
		{
			sensortype1 = 301;
		}
    }
	else if(sensortype1 === 301 || sensortype1 === 302)
    {
        verticality += Math.random()*0.1 - 0.05;
        if (verticality > 90)
        {
            verticality = 90;
        }
        else if (verticality < 87)
        {
            verticality = 87;
        }
        verticality = Math.round(verticality * 100) / 100;
		msg = `A0${sensortype1}CZD${verticality}B`;
		sensortype1 ++;
		if (sensortype1 === 303) 
		{
			sensortype1 = 101;
		}		
    }	

    clientSocket.send(msg, 0, msg.length, 5683);
	console.log(msg,msg.length)
}

function sendMsgCableforce()
{	
    var cableforce = 650;
	var msg;
	
	if(sensortype2 === 501 || sensortype2 === 502 || sensortype2 === 503 || sensortype2 === 504 || sensortype2 === 505 || sensortype2 === 506)
    {
        cableforce += Math.random()*100 - 50;
        if (cableforce > 700)
        {
            cableforce = 700;
        }
        else if (cableforce < 500)
        {
            cableforce = 500;
        }
        cableforce = Math.round(cableforce * 10) / 10;
		msg = `A0${sensortype2}SL${cableforce}B`;
		sensortype2 ++;
		if (sensortype2 === 507) 
		{
			sensortype2 = 501;
		}		
    }

    clientSocket.send(msg, 0, msg.length, 5683);
	console.log(msg,msg.length)
}

function sendMsgTemperature()
{	
    var temperature = 10;
    var humidity = 30;
	var msg;
	
	if(sensortype3 === 701 || sensortype3 === 702)
    {
        temperature += Math.random() - 0.5;
        if (temperature > 15)
        {
            temperature = 15;
        }
        else if (temperature < 0)
        {
            temperature = 0;
        }
        temperature = Math.round(temperature * 10) / 10;

        humidity += Math.random() - 0.5;
        if (humidity > 50)
        {
            humidity = 50;
        }
        else if (humidity < 10)
        {
            humidity = 10;
        }
        humidity = Math.round(humidity * 10) / 10;
		msg = `A0${sensortype3}wd${temperature}sd${humidity}%B`;
		sensortype3 ++;
		if (sensortype3 === 703) 
		{
			sensortype3 = 701;
		}
    }

    clientSocket.send(msg, 0, msg.length, 5683);
	console.log(msg,msg.length)
}

function sendMsgAcc()
{	
	var msg;
	
    if(sensortype4 === 601 || sensortype4 === 602 || sensortype4 === 603 || sensortype4 === 604 || sensortype4 === 605 || sensortype4 === 606)
    {
/*         x += Math.random()*100 - 50;
        y += Math.random()*100 - 50;
        z += Math.random()*100 - 50; */
        x = Math.sin(value* 0.017453293 )*100;
        y = Math.sin(value* 0.017453293 )*100;
        z = Math.sin(value* 0.017453293 )*100;		
        if (x > 700)
        {
            x = 700;
        }
        else if (x < -700)
        {
            x = -700;
        }
        x = Math.round(x * 10) / 10;
        if (y > 700)
        {
            y = 700;
        }
        else if (y < -700)
        {
            y = -700;
        }
        y = Math.round(y * 10) / 10;
        if (z > 700)
        {
            z = 700;
        }
        else if (z < -700)
        {
            z = -700;
        }
        z = Math.round(z * 10) / 10;
		value++;
		if(value > 360)
		{
			value = 0;
		}
		msg = `A0${sensortype4}X${x}Y${y}Z${z}B`;
		clientSocket.send(msg, 0, msg.length, 5683);
		console.log(msg,msg.length)		
    }

	sensortype4 ++;	
	
	if (sensortype4 === 611) 
	{
		sensortype4 = 601;
	}	

}

function sendMsgCorrosion()
{	
    var corrosion = 0.01;
	var msg;
	
    if(sensortype5 === 801 || sensortype5 === 802)
    {
        corrosion = 1.012929;
		msg = `A0${sensortype5}FSA${corrosion}B56B`;
		sensortype5 ++;
		if (sensortype === 803) 
		{
			sensortype5 = 801;
		}
    }

    clientSocket.send(msg, 0, msg.length, 5682);
	console.log(msg,msg.length)
}

//start a timer to send message to echoServer 
setInterval(sendMsgDisplacementAndVerticality, 1000*10);
setInterval(sendMsgCableforce, 1000*10);
setInterval(sendMsgTemperature, 1000*30);
setInterval(sendMsgAcc, 500);
setInterval(sendMsgCorrosion, 1000*60*20);

clientSocket.on('message', function (msg, rinfo)
{
    console.log('recv %s(%d) from server', msg, msg.length);
});

clientSocket.on('error', function (err)
{
    console.log('error, msg - %s, stack - %s', err.message, err.stack);
});

clientSocket.bind(54321);
