var dgram = require('dgram');
var clientSocket = dgram.createSocket('udp4');
var sensortype1 = 101;
var sensortype2 = 501;
var sensortype3 = 701;
var sensortype4 = 601;
var sensortype5 = 801;
var sensortype6 = 901;
var x = 35;
var y = 40;
var z = -998;
var sinvalue = 0;
var displacement = -7;
var verticality = 0;
var cableforce = 950;
var temperature = 10;
var humidity = 35;
var corrosion = 0.01;
var lane = '01';
var index = 1;

function sendMsgDisplacementAndVerticality()
{	
	var msg;
	
    if(sensortype1 === 101 || sensortype1 === 102 || sensortype1 === 103 || sensortype1 === 104)
    {
        displacement += Math.random()*20 - 10;
        if (displacement > 0)
        {
            displacement = -7;
        }
        else if (displacement < -30)
        {
            displacement = -10;
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
        if (verticality > 2)
        {
            verticality = 0.5;
        }
        else if (verticality < -2)
        {
            verticality = -0.3;
        }
        verticality = Math.round(verticality * 100) / 100;
		msg = `A0${sensortype1}CZD${verticality}B\r\n`;
		sensortype1 ++;
		if (sensortype1 === 303) 
		{
			sensortype1 = 101;
		}		
    }	

    clientSocket.send(msg, 0, msg.length, 5682);
	console.log(msg,msg.length)
}

function sendMsgCableforce()
{	
	var msg;
	
	if(sensortype2 === 501 || sensortype2 === 502 || sensortype2 === 503 || sensortype2 === 504 || sensortype2 === 505 || sensortype2 === 506)
    {
        cableforce += Math.random()*600 - 300;
        if (cableforce > 1500)
        {
            cableforce = 870;
        }
        else if (cableforce < 800)
        {
            cableforce = 935;
        }
        cableforce = Math.round(cableforce * 10) / 10;
		msg = `A0${sensortype2}SL${cableforce}B\r\n`;
		sensortype2 ++;
		if (sensortype2 === 507) 
		{
			sensortype2 = 501;
		}		
    }

    clientSocket.send(msg, 0, msg.length, 5682);
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
        if (humidity > 90)
        {
            humidity = 75;
        }
        else if (humidity < 10)
        {
            humidity = 28;
        }
        humidity = Math.round(humidity * 10) / 10;
		msg = `A0${sensortype3}WD${temperature}SD${humidity}B\r\n`;
		sensortype3 ++;
		if (sensortype3 === 703) 
		{
			sensortype3 = 701;
		}
    }

    clientSocket.send(msg, 0, msg.length, 5682);
	console.log(msg,msg.length)
}

function sendMsgAcc()
{	
	var msg;
	
    if(sensortype4 === 601 || sensortype4 === 602 || sensortype4 === 603 || sensortype4 === 604 || sensortype4 === 605 || sensortype4 === 606)
    {
/*         x = Math.sin(sinvalue* 0.017453293 )*100 + Math.random()*100 - 50;
        y = Math.sin(sinvalue* 0.017453293 )*100 + Math.random()*100 - 50;
        z = Math.sin(sinvalue* 0.017453293 )*100 + Math.random()*100 - 50; */
        x += Math.random()*100 - 20;
        y += Math.random()*100 - 20;
        z += Math.random()*100 - 20;			
        if (x > 300)
        {
            x = 289;
        }
        else if (x < 0)
        {
            x = 15;
        }
        x = Math.round(x * 10) / 10;
        if (y > 300)
        {
            y = 289;
        }
        else if (y < 0)
        {
            y = 15;
        }
        y = Math.round(y * 10) / 10;
        if (z > -700)
        {
            z = -721;
        }
        else if (z < -1300)
        {
            z = -1287;
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
		clientSocket.send(msg, 0, msg.length, 5682);
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

    clientSocket.send(msg, 0, msg.length, 5682);
	console.log(msg,msg.length)
}

function sendMsgtrafficload()
{
	var startflag = 'ff';
	var commandword = '01';
	var datalength = '99';
	var id = '30393031303030303030303030303030';
	var siteid = '303031303030303030303030303030';
	if (lane == '01'){
		lane = '02';
	}else{
		lane = '01';
	}
	var licenseplate;
	if (index === 1){
		licenseplate = 'CBD54136363338310000';
		index++;
	}else if(index === 2)
	{
		licenseplate = 'CBD54131323133340000';
		index++;
	}else if(index === 3)
	{
		licenseplate = 'CBD54B39313637330000';
		index++;
	}else if(index === 4)
	{
		licenseplate = 'CBD54132323638310000';
		index++;
	}else if(index === 5)
	{
		licenseplate = 'CBD54333363334350000';
		index++;
	}else if(index === 6)
	{
		licenseplate = 'CBD54B35363333350000';
		index++;
	}
	else if(index === 7)
	{
		licenseplate = 'CDEE4336313333350000';
		index = 1;
	}
	
	var axesnumber = Math.round(Math.random()*10);
	if (axesnumber == 0 || axesnumber == 1 || axesnumber == 9){
		axesnumber = 2;
	}
	axesnumberhex = 0+axesnumber.toString(16);
	
	var weight;
	var time = '07e00101091414';
	var weightlimit = 'afc8';
	var overweight;
	var overweighttag;
	var axesweight = ['0000','0000','0000','0000','0000','0000','0000','0000'];
	for (let i = 0; i < axesnumber; i++)
	{
		if (i == 0)
		{
			axesweightvalue = Math.round(Math.random()*1000);
			if(axesweightvalue < 500)
			{
				axesweightvalue = axesweightvalue + 300;
			}
			axesweight[i] = axesweightvalue.toString(16);
		}else if (i == axesnumber-1)
		{
			axesweightvalue = Math.round(Math.random()*1000);
			if(axesweightvalue < 500)
			{
				axesweightvalue = axesweightvalue + 300;
			}
			axesweight[i] = axesweightvalue.toString(16);
		}else
		{
			axesweightvalue = Math.round(Math.random()*5000);
			if(axesweightvalue < 1000)
			{
				axesweightvalue = axesweightvalue + 1000;
			}
			axesweight[i] = axesweightvalue.toString(16);
		}
		axesweight[i] = padLeft(axesweight[i],4);
	}
	weight = (parseInt(axesweight[0], 16) + parseInt(axesweight[1], 16) + parseInt(axesweight[2], 16) + parseInt(axesweight[3], 16)
			+ parseInt(axesweight[4], 16) + parseInt(axesweight[5], 16) + parseInt(axesweight[6], 16) + parseInt(axesweight[7], 16)).toString(16);  
	weight = padLeft(weight,4);
	overweight = parseInt(weight,16) - parseInt(weightlimit,16);
	if (overweight <= 0){
		overweight = '0000';
		overweighttag = '00';
	}else{
		overweight = overweight.toString(16);
		overweight = padLeft(overweight,4);
		overweighttag = '01';
	}
	var axesvelocity = ['00','00','00','00','00','00','00','00'];
	for (let i = 0; i < axesnumber; i++)
	{
		if (i == 0)
		{
			axesvelocityvalue = Math.round(Math.random()*120);
			axesvelocity[i] = axesvelocityvalue.toString(16);
			
		}else{
			axesvelocityvalue = axesvelocityvalue + Math.round(Math.random()*12) - 6;
			axesvelocity[i] = axesvelocityvalue.toString(16);
		}
		axesvelocity[i] = padLeft(axesvelocity[i],2);
	}
	var shaftspacing = ['0000','0000','0000','0000','0000','0000','0000','0000'];
	for (let i = 0; i < axesnumber-1; i++)
	{
		shaftspacing[i] = '00c8';
	}
	var totalwheelbase = '00c8';
	var carlength = '00c8';
	var fronthanginglong = '00c8';
	var afterhanginglong = '00c8';
	var vehiclespacing = '00c8';
	var direction = '00';
	var vehicletype = '0001';
	var violationtype = '00';
	var temperature = '05';
	var correctnesstype = '00';
	var vehiclespacingtime = '0011';
	var axesgroupweight = ['0000','0000','0000','0000','0000','0000','0000','0000'];
	for (let i = 0; i < axesnumber; i++)
	{
		axesgroupweight[i] = (Math.round(Math.random()*1000)).toString(16);
		axesgroupweight[i] = padLeft(axesgroupweight[i],4);
	}	
	var axesequivalentload = ['0000','0000','0000','0000','0000','0000','0000','0000'];
	for (let i = 0; i < axesnumber; i++)
	{
		axesequivalentload[i] = (Math.round(Math.random()*1000)).toString(16);
		axesequivalentload[i] = padLeft(axesequivalentload[i],4);
	}
	var passingtime = '0011';
	var acrosstag = '00';
	var sum = '0095';

	var msg;                                                                                                                                                                                  
	if(sensortype6 === 901)
    {
		msg = `${startflag}${commandword}${datalength}${id}${siteid}${lane}${licenseplate}${axesnumberhex}${weight}${time}${weightlimit}${overweight}${axesweight[0]}${axesweight[1]}${axesweight[2]}${axesweight[3]}${axesweight[4]}${axesweight[5]}${axesweight[6]}${axesweight[7]}${axesvelocity[0]}${axesvelocity[1]}${axesvelocity[2]}${axesvelocity[3]}${axesvelocity[4]}${axesvelocity[5]}${axesvelocity[6]}${axesvelocity[7]}${shaftspacing[0]}${shaftspacing[1]}${shaftspacing[2]}${shaftspacing[3]}${shaftspacing[4]}${shaftspacing[5]}${shaftspacing[6]}${totalwheelbase}${carlength}${fronthanginglong}${afterhanginglong}${vehiclespacing}${direction}${vehicletype}${violationtype}${temperature}${correctnesstype}${vehiclespacingtime}${axesgroupweight[0]}${axesgroupweight[1]}${axesgroupweight[2]}${axesgroupweight[3]}${axesgroupweight[4]}${axesgroupweight[5]}${axesgroupweight[6]}${axesgroupweight[7]}${axesequivalentload[0]}${axesequivalentload[1]}${axesequivalentload[2]}${axesequivalentload[3]}${axesequivalentload[4]}${axesequivalentload[5]}${axesequivalentload[6]}${axesequivalentload[7]}${passingtime}${acrosstag}${overweighttag}${sum}`;
    }

    clientSocket.send(msg, 0, msg.length, 5681);
	console.log(msg,msg.length)
}

//start a timer to send message to echoServer 
setInterval(sendMsgDisplacementAndVerticality, 1000*10);
setInterval(sendMsgCableforce, 1000*10);
setInterval(sendMsgTemperature, 1000*30);
setInterval(sendMsgAcc, 700);
setInterval(sendMsgCorrosion, 1000); //1000*60*20
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

function padLeft(str,lenght){ 
	if(str.length >= lenght)
	{
		return str;
	}else{
		return padLeft("0" +str,lenght);
	} 	 
} 
function padRight(str,lenght){ 
	if(str.length >= lenght) 
	return str; 
	else 
	return padRight(str+"0",lenght); 
}
