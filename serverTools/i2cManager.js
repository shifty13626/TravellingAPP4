const i2c = require('i2c-bus');
var log = require("./log.js");

const mbed = 0x04;
const rasp = 0x05;

module.exports = {
	CheckI2cDevice : function() {
		CheckI2cDevice();
	},
	sendData : function(action, params) {
		sendDataI2c(action, params);
	}
}


// Detect devices on the I2C Bus
function CheckI2cDevice () {
	rasp2c.detect(function(err, result) {
		if (err) {
		log.writeLine(err);
		} else {
		log.writeLine(result);
		}
	});
}


const toCelsius = rawData => {
  console.log(rawData & 0x0fff);
  console.log(typeof(rawData & 0x0fff));
  let celsius = (rawData & 0x0fff) / 16;
  if (rawData & 0x1000) {
    celsius -= 256;
  }
  return celsius;
};


function sendDataI2c(action, params)
{
	log.writeLine("Send i2c message");
/*
	const arr = new Uint16Array(2);

	arr[0] = 1;
	arr[1] = 50;
	
	// Shares memory with `arr`.
	const wbuf = Buffer.from(arr.buffer);
*/

	//const wbuf = Buffer.from([rasp]);
	wbuf = Buffer.from([action, params]);
	const rbuf = Buffer.alloc(2);

	log.writeLine("Message to send : " +wbuf);
	log.writeLine("size : " +wbuf.length);
	for (var i=0; i<wbuf.length; i++)
	{
		log.writeLine(wbuf[i]);
	}

	console.log("Envoi");
	i2c.openPromisified(1).
	then(i2c1 => i2c1.i2cWrite(mbed, wbuf.length, wbuf).
	  then(_ => i2c1.i2cRead(mbed, rbuf.length, rbuf)).
	  then(data => console.log(data.buffer.readUInt16BE() & 0x0fff )).
	  then(_ => i2c1.close())
	).catch(console.log);
	console.log("Envoyé");
	return data.buffer.readUInt16BE() & 0x0fff;
}

function readData()
{
	console.log("Envoi");
	i2c.openPromisified(1).
	then(i2c1 => i2c1.i2cWrite(mbed, wbuf.length, wbuf).
		then(_ => i2c1.i2cRead(mbed, rbuf.length, rbuf)).
		then(data => console.log(data.buffer.readUInt16BE() & 0x0fff )).
		then(_ => i2c1.close())
	).catch(console.log);
	console.log("Envoyé");
}