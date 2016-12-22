var dgram = require('dgram');
var clientSocket = dgram.createSocket('udp4');
var sensortype = 801;

function sendMsg()
{	
    var deflection = 5;
    var displacement = 17;
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
	
    if(sensortype === 101 || sensortype === 102 || sensortype === 103 || sensortype === 104)
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
		msg = `A0${sensortype}WY${displacement}B`;
		sensortype ++;
		if (sensortype === 105) 
		{
			sensortype = 101;
		}
    }
    else if(sensortype === 201 || sensortype === 202 || sensortype === 203)
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
		msg = `A0${sensortype}ND${deflection}B`;
		sensortype ++;
		if (sensortype === 204) 
		{
			sensortype = 301;
		}		
    }	
    else if(sensortype === 301 || sensortype === 302)
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
		msg = `A0${sensortype}CZD${verticality}B`;
		sensortype ++;
		if (sensortype === 303) 
		{
			sensortype = 401;
		}		
    }
    else if(sensortype === 401 || sensortype === 402 || sensortype === 403 || sensortype === 404 ||sensortype === 405 
		|| sensortype === 406 || sensortype === 407 || sensortype === 408 || sensortype === 409 || sensortype === 410  
		|| sensortype === 411 || sensortype === 412 || sensortype === 413 || sensortype === 414 || sensortype === 415 
		|| sensortype === 416 || sensortype === 417 || sensortype === 418 || sensortype === 419 || sensortype === 420 
		|| sensortype === 421 || sensortype === 422 || sensortype === 423 || sensortype === 424 || sensortype === 425 
		|| sensortype === 426 || sensortype === 427 || sensortype === 428 || sensortype === 429 || sensortype === 430
		|| sensortype === 431 || sensortype === 432)
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
		msg = `A0${sensortype}YB${strain}B`;
		sensortype ++;
		if (sensortype === 433) 
		{
			sensortype = 501;
		}		
    }
    else if(sensortype === 501 || sensortype === 502 || sensortype === 503 || sensortype === 504 || sensortype === 505 || sensortype === 506)
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
		msg = `A0${sensortype}SL${cableforce}B`;
		sensortype ++;
		if (sensortype === 507) 
		{
			sensortype = 601;
		}		
    }
    else if(sensortype === 601 || sensortype === 602 || sensortype === 603 || sensortype === 604 || sensortype === 605 || sensortype === 606)
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
		msg = `A0${sensortype}X${x}Y${y}Z${z}B`;
		sensortype ++;
		if (sensortype === 607) 
		{
			sensortype = 701;
		}		
    }
    else if(sensortype === 701 || sensortype === 702)
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
		msg = `A0${sensortype}wd${temperature}sd${humidity}%B`;
		sensortype ++;
		if (sensortype === 703) 
		{
			sensortype = 801;
		}
    }
    else if(sensortype === 801 || sensortype === 802)
    {
        corrosion = 0.01;
		msg = `A0${sensortype}FSA${corrosion}B56B`;
		sensortype ++;
		if (sensortype === 803) 
		{
			sensortype = 101;
		}
    }
	
/* 	//port 5682 test
	if(sensortype === 801 || sensortype === 802)
    {
        corrosion = 1.012929;
		//msg = 0x413034303146533F81A7A9420D0A;
		//msg = `A0${sensortype}FS${corrosion}B`;
		// msg = new Buffer([ 0x41, 0x30, 0x38, 0x30, 0x31, 0x46, 0x53, 0x3F, 0x81, 0xA7, 0xA9, 0x42, 0x55, 0x91, 0x9E,0x42 ]);
		msg = `A0${sensortype}FSA1.01B56B`;
		sensortype ++;
		if (sensortype === 803) 
		{
			sensortype = 801;
		}
    } */

    clientSocket.send(msg, 0, msg.length, 5683);
	console.log(msg,msg.length)
}

//start a timer to send message to echoServer 85
setInterval(sendMsg, 1000);

clientSocket.on('message', function (msg, rinfo)
{
    console.log('recv %s(%d) from server', msg, msg.length);
});

clientSocket.on('error', function (err)
{
    console.log('error, msg - %s, stack - %s', err.message, err.stack);
});

clientSocket.bind(54321);
