var log = require("./log.js");
var i2cManager = require("./i2cManager.js");

const Gpio = require('onoff').Gpio;

var gpioFront;
var gpioBack;

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
    }
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
    log.writeLine(decimalToHexString(speed));

    i2cManager.sendData(0x01, decimalToHexString(speed));
    

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


function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}