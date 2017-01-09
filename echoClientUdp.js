var dgram = require('dgram');
var clientSocket = dgram.createSocket('udp4');
var sensortype1 = 101;
var sensortype2 = 501;
var sensortype3 = 701;
var sensortype4 = 601;
var sensortype5 = 801;
var sensortype6 = 901;
var x = 100;
var y = 100;
var z = 100;
var sinvalue = 0;
var displacement = 7;
var verticality = 90;
var cableforce = 650;
var temperature = 10;
var humidity = 30;
var corrosion = 0.01;

function sendMsgDisplacementAndVerticality()
{	
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
		msg = `A0${sensortype1}WY${displacement}B\r\n`;
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
		msg = `A0${sensortype1}CZD${verticality}B\r\n`;
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
		msg = `A0${sensortype2}SL${cableforce}B\r\n`;
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
		msg = `A0${sensortype3}WD${temperature}SD${humidity}B\r\n`;
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
        x = Math.sin(sinvalue* 0.017453293 )*100 + Math.random()*100 - 50;
        y = Math.sin(sinvalue* 0.017453293 )*100 + Math.random()*100 - 50;
        z = Math.sin(sinvalue* 0.017453293 )*100 + Math.random()*100 - 50;	
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
		sinvalue += 30;
		if(sinvalue > 360)
		{
			sinvalue = 0;
		}
		
		sensortype4 ++;	
	
		if (sensortype4 === 607) 
		{
			sensortype4 = 601;
		}	
		msg = `A0${sensortype4}X${x}Y${y}Z${z}B\r\n`;
		clientSocket.send(msg, 0, msg.length, 5683);
		console.log(msg,msg.length)		
    }

}

function sendMsgCorrosion()
{	
	var msg;
	
    if(sensortype5 === 801 || sensortype5 === 802)
    {
		msg = `A0${sensortype5}FSA${corrosion}B56B\r\n`;
		sensortype5 ++;
		if (sensortype5 === 803) 
		{
			sensortype5 = 801;
		}
    }

    clientSocket.send(msg, 0, msg.length, 5683);
	console.log(msg,msg.length)
}

function sendMsgtrafficload()
{	
	let x = Math.ceil(Math.random()*100);
	if(x < 10)
	{
		x = 10;
	}

/* 	var msg = [0xff,0x01,0x99,0x30,0x39,0x30,0x31,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,  //字节1~19
			   0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,0x30,   //字节20~34
			   0x01,0xBE,0xA9,0x41,0x31,0x32,0x33,0x34,0x35,0xD1,0xA7,  //字节35~45
			   0x03,0x17,0x70,0x07,0xe0,0x01,0x01,0x09,0x14,0x14,		//字节46~55
			   0x4e,0x20,0x03,0xe8,0x17,0x70,0x27,0x10,0x2e,0xe0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,	//字节56~75
			   0x04,0x05,0x06,0x00,0x00,0x00,0x00,0x00,		//字节76~83,轴速
			   0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,0x00,0xc8,		//字节84~107,轴间距等
			   0x00,0x00,0x01,0x00,0x0a,0x00,0x00,0x11,		//字节108~115
			   0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,0x03,0xe8,		//字节116~147
			   0x00,0x11,0x00,0x00,0x00,0x95];  //字节148~153 */

	var msg = '01993030303030303030303030303030303030303030303030303030303030303001BEA9413132333435D1A703177007e001010914144e2003e8177027102ee000000000000000000000040506000000000000c800c800c800c800c800c800c800c800c800c800c800c8000001000a00001103e803e803e803e803e803e803e803e803e803e803e803e803e803e803e803e8001100000095';                                                                                                                                                                                    
	if(sensortype6 === 901)
    {
		msg = `${x}${msg}`;
    }

    clientSocket.send(msg, 0, msg.length, 5681);
	console.log(msg,msg.length)
}

//start a timer to send message to echoServer 
setInterval(sendMsgDisplacementAndVerticality, 1000*10);
setInterval(sendMsgCableforce, 1000*10);
setInterval(sendMsgTemperature, 1000*30);
setInterval(sendMsgAcc, 500);
setInterval(sendMsgCorrosion, 1000*60*20); 
setInterval(sendMsgtrafficload, 1000*5);

clientSocket.on('message', function (msg, rinfo)
{
    console.log('recv %s(%d) from server', msg, msg.length);
});

clientSocket.on('error', function (err)
{
    console.log('error, msg - %s, stack - %s', err.message, err.stack);
});

clientSocket.bind(54321);
