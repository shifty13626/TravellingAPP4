const i2c = require('i2c-bus');
var log = require("./log.js");

const mbed = 0x04;
const rasp = 0x05;

module.exports = {
	CheckI2cDevice : function() {
		CheckI2cDevice();
	},
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
 
//const wbuf = Buffer.from([rasp]);
const wbuf = Buffer.from([rasp]);
const rbuf = Buffer.alloc(2);

for (var i=0; i<wbuf.length; i++)
{
	console.log(wbuf[i]);
	console.log(typeof(wbuf[i]));
}

function sendData(int)
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