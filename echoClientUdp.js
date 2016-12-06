var dgram = require('dgram');
var clientSocket = dgram.createSocket('udp4');
var sensortype = 01;

function sendMsg()
{	
    var deflection = 5;
    var displacement = 10;
    var verticality = 90;
    var strain = 0.5;
    var cableforce = 650;
    var x = 100;
    var y = 100;
    var z = 100;
    var temperature = 10;
    var humidity = 30;
    var corrosion = 0.01;
	var msg;
	
    if(sensortype === 01)
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
		msg = `A0101WY${displacement}B`;
		sensortype = 02;		
    }
    else if(sensortype === 02)
    {
        deflection += Math.random()- 0.5;
        if (deflection > 50)
        {
            deflection = 50;
        }
        else if (deflection < -10)
        {
            deflection = -10;
        }
        deflection = Math.round(deflection * 100) / 100;
		msg = `A0201ND${deflection}B`;
		sensortype = 03;		
    }
    else if(sensortype === 03)
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
		msg = `A0301CZD${verticality}B`;
		sensortype = 04;		
    }
    else if(sensortype === 04)
    {
        strain += Math.random()*0.1 - 0.05;
        if (strain > 2)
        {
            strain = 2;
        }
        else if (strain < 0)
        {
            strain = 0;
        }
        strain = Math.round(strain * 100) / 100;
		msg = `A0401YB${strain}B`;
		sensortype = 05;		
    }
    else if(sensortype === 05)
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
		msg = `A0501SL${cableforce}B`;
		sensortype = 06;		
    }
    else if(sensortype === 06)
    {
        x += Math.random()*100 - 50;
        y += Math.random()*100 - 50;
        z += Math.random()*100 - 50;
        if (x > 700)
        {
            x = 700;
        }
        else if (x < 0)
        {
            x = 0;
        }
        x = Math.round(x * 10) / 10;
        if (y > 700)
        {
            y = 700;
        }
        else if (y < 0)
        {
            y = 0;
        }
        y = Math.round(y * 10) / 10;
        if (z > 700)
        {
            z = 700;
        }
        else if (z < 0)
        {
            z = 0;
        }
        z = Math.round(z * 10) / 10;
		msg = `A0601X${x}Y${y}Z${z}B`;
		sensortype = 07;		
    }
    else if(sensortype === 07)
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
		msg = `A0701wd${temperature}sd${humidity}%B`;
		sensortype = 08;
    }
    else if(sensortype === 08)
    {
        corrosion = 0.01;
		msg = `A0801FS${corrosion}B`;
		sensortype = 01;
    }

	console.log(msg);	

    clientSocket.send(msg, 0, msg.length, 5683);
}

//start a timer to send message to echoServer
setInterval(sendMsg, 5000);

clientSocket.on('message', function (msg, rinfo)
{
    console.log('recv %s(%d) from server', msg, msg.length);
});

clientSocket.on('error', function (err)
{
    console.log('error, msg - %s, stack - %s', err.message, err.stack);
});

clientSocket.bind(54321);
