var log = require("./log.js");
const Gpio = require('onoff').Gpio;

const i2c = require('i2c-bus');
 
const MCP9808_ADDR = 0x18;
const TEMP_REG = 0x04;
 
const toCelsius = rawData => {
  rawData = (rawData >> 8) + ((rawData & 0xff) << 8);
  let celsius = (rawData & 0x0fff) / 16;
  if (rawData & 0x1000) {
    celsius -= 256;
  }
  return celsius;
};
 



var rasp2c = require('rasp2c');
/*
var localAddress = 0x18;
var mbedAddress = 0x04;
*/

// set address to the raspberry
//var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface

var gpioFront;
var gpioBack

/*
const gpioFront = new Gpio(17, 'out');
const gpioBack = new Gpio(18, 'out');
*/
var speed = 5;

module.exports = {
    setSpeed : function(value) {
        setSpeedValue(value);
    },
    getSpeed : function() {
        log.writeLine("Speed parameter :" +speed);
        return speed;
    },
    mouveBack : function() {
        mouveBackExecution();
    },
    mouveFront : function() {
        mouveFrontExecution();
    },
    mouveStop : function () {
        mouveStopExecution();
    },
    loadGPIO : function(config) {
        log.writeLine("Set GPIO config");
        gpioFront = new Gpio(config.pinFront, 'out');
        gpioBack = new Gpio(config.pinBack, 'out');
    },
    detectI2c : function() {
        CheckI2cDevice();
    }

}


// Detect devices on the I2C Bus
function CheckI2cDevice () {
    rasp2c.detect(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  testI2c();
}

function testI2c() {
    const i2c1 = i2c.openSync(1);
    const rawData = i2c1.readWordSync(MCP9808_ADDR, TEMP_REG);
    console.log(toCelsius(rawData));
    i2c1.closeSync();
}



// speed region
function setSpeedValue(value) {
    speed = value;
    log.writeLine("Speed mouve set to : " +speed);
}

function getSpeedValue() {
    log.writeLine("Speed parameter :" +speed);
    return speed;
}

// mouvement region
function mouveFrontExecution() {
    log.writeLine("mouveFront function start");
    // Back -> 0
    log.writeLine("Value gpio1 (back) : " +gpioBack.readSync());
    if (gpioBack.readSync() === 1)
    {
        log.writeLine("Set gpio1 to value 0");
        gpioBack.writeSync(0);
    }
    // Front -> 1
    log.writeLine("Value gpio0 (front) : " +gpioFront.readSync());
    if (gpioFront.readSync() === 0)
    {
        log.writeLine("Set gpio0 to value 1");
        gpioFront.writeSync(1);
    }
}

function mouveBackExecution(){
    log.writeLine("mouveBack function start");
    // Front -> 0
    log.writeLine("Value gpio0 (front) : " +gpioFront.readSync());
    if (gpioFront.readSync() === 1)
    {
        log.writeLine("Set gpio0 to value 0");
        gpioFront.writeSync(0);
    }
    // Back -> 1
    log.writeLine("Value gpio1 (back) : " +gpioBack.readSync());
    if (gpioBack.readSync() === 0)
    {
        log.writeLine("Set gpio1 to value 0");
        gpioBack.writeSync(1);
    }
}

function mouveStopExecution() {
    log.writeLine("mouveStop function start");
    // Front -> 0
    log.writeLine("Value gpio0 (front) : " +gpioFront.readSync());
    if (gpioFront.readSync() === 1)
    {
        log.writeLine("Set gpio0 to value 0");
        gpioFront.writeSync(0);
    }
    // Back -> 0
    log.writeLine("Value gpio1 (back) : " +gpioBack.readSync());
    if (gpioBack.readSync() === 1)
    {
        log.writeLine("Set gpio1 to value 0");
        gpioBack.writeSync(0);
    }
}