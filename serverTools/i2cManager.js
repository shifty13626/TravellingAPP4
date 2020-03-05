const i2c = require('i2c-bus');
var log = require("./log.js");

const mbed = 0x04;
const rasp = 0x05;

// to export all functions of this file to the other
module.exports = {
	CheckI2cDevice : function() {
		CheckI2cDevice();
	},
	sendData : function(config, action, params) {
		sendDataI2c(config, action, params);
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

// Method to send I2C message and receive a return of the Bded card
function sendDataI2c(config, action, params)
{
	if (config.i2cEnable)
	{
		log.writeLine("Send i2c message");

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
	else
		return 0;
}