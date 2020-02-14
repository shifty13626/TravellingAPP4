var log = require("./log.js");
var i2cManager = require("./i2cManager.js");

var speedWagon = 5;
var breake = 5;

var speedRotationCamera = 5;

module.exports = {
    setspeedWagon : function(value) {
        setspeedWagonValue(value);
    },
    getspeedWagon : function() {
        log.writeLine("speedWagon parameter :" +speedWagon);
        return speedWagon;
    },
    setBreake : function (value) {
        setBreakeFunction(value);
    },
    getBreake : function () {
        log.writeLine("Breake value : " +breake);
        return breake;
    },
    setSpeedRotationCamera : function (value) {
        setSpeedRotationCameraFunction(value);
    },
    getSpeedRotationCamera : function() {
        log.writeLine("Rotation camera value : " +speedRotationCamera);
        return speedRotationCamera;
    },
    mouveWagon : function(config) {
        mouveWagonFunction(config);
    },
    brakeWagon : function(config) {
        brakeWagonFunction(config);
    },
    changeDirection : function () {
        changeDirectionFunction();
    },
    mouveCamera : function (config) {
        mouveCameraFunction(config)
    },
    changeDirectionCamera : function () {
        changeDirectionCameraFunction();
    }
}

// speedWagon region
function setspeedWagonValue(value) {
    speedWagon = value;
    log.writeLine("speedWagon mouve set to : " +speedWagon);
}

function setBreakeFunction(value) {
    breake = value;
    log.writeLine("Breake value set to : " +breake);
}

function setSpeedRotationCameraFunction(value) {
    speedRotationCamera = value;
    log.writeLine("Speed rotation camera value set to : " +speedRotationCamera);
}

// mouvement region
function mouveWagonFunction(config) {
    log.writeLine("mouveWagon function start");
    log.writeLine("speedWagon for mouve : " +decimalToHexString(speedWagon) +"%");

    i2cManager.sendData(0x01, decimalToHexString(speedWagon * config.coeffMouveWagon));

    log.writeLine("End of function mouveWagon");
}

function brakeWagonFunction(config) {
    log.writeLine("mouveWagon function start");
    log.writeLine("speedWagon for mouve : " +decimalToHexString(speedWagon) +"%");

    i2cManager.sendData(0x03, decimalToHexString(breake * config.coeffBrakeWagon));

    log.writeLine("End of function brakeWagon");
}

function changeDirectionFunction() {
    log.writeLine("changeDirection function start");

    i2cManager.sendData(0x02);

    log.writeLine("End of function changeDirection");
}

function mouveCameraFunction(config) {
    log.writeLine("mouveCamera function start");
    log.writeLine("speed for rotation camera : " +decimalToHexString(speedRotationCamera * config.coeffSpeedRotationCamera) +"%");

    i2cManager.sendData(0x04, decimalToHexString(speedRotationCamera * config.coeffSpeedRotationCamera));

    log.writeLine("End of function mouveCamera");
}

function changeDirectionCameraFunction() {
    log.writeLine("changeDirectionCamera function start");

    i2cManager.sendData(0x06);

    log.writeLine("End of function changeDirectionCamera");
}


function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}