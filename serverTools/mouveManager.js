var log = require("./log.js");
var i2cManager = require("./i2cManager.js");

// global value
var speedWagon = 5;
var breake = 50;
var mouveDirection = 0;
var colorStrip = 0;
var distanceStart = 0;

var speedRotationCamera = 5;

// to export all methods of this file to the other
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

    returnToStart : function() {
        returnToStartFunction();
    },

    mouveWagon : function(config) {
        mouveWagonFunction(config);
    },
    brakeWagon : function(config) {
        brakeWagonFunction(config);
    },
    changeDirection : function (value, config) {
        changeDirectionFunction(value, config);
    },
    
    mouveCamera : function (config) {
        mouveCameraFunction(config)
    },
    changeDirectionCamera : function () {
        changeDirectionCameraFunction();
    }
}

/////////////////////////
// set value parameter //
/////////////////////////

function setspeedWagonValue(value) {
    speedWagon = value;
}

function setBreakeFunction(value) {
    breake = value;
    log.writeLine("Breake value set to : " +breake);
}

function setSpeedRotationCameraFunction(value) {
    speedRotationCamera = value;
    log.writeLine("Speed rotation camera value set to : " +speedRotationCamera);
}
 
//////////////////////
// mouvement region //
//////////////////////

// fonction pour retourner au debut du rail
function returnToStartFunction() {

}

// To mouve wagon
function mouveWagonFunction(config) {
    log.writeLine("mouveWagon function start");
    log.writeLine("speedWagon for mouve : " +decimalToHexString(speedWagon) +"%");
    log.writeLine("speedWagon for mouve with coeff: " +decimalToHexString(speedWagon * config.coeffSpeedWagon) +"%");

    log.writeLine("coeff : " +config.coeffSpeedWagon);
    var returnedValue = i2cManager.sendData(0x01, decimalToHexString(speedWagon));

    // analyse new position of wagon
    //setInterval(analysePosisitonWagon(config), 500);
    
}

// Loop to detect new strip on the rail to know the possition of the wagon
function analysePosisitonWagon (config) {
    while(true)
    {
        var ret = i2cManager.sendData(0x07);
        if (ret != colorStrip) {
            log.writeLine("New strip distance detected");
            log.writeLine("Distance between the start point : " +distanceStart +" cm");
            
            if (mouveDirection === 0) {
                distanceStart += config.lengthStrip;
                changeStripIndex();
            }
            else {
                distanceStart -= config.lengthStrip;
                changeStripIndex();
            }
        }
    }
}

function changeStripIndex() {
    if (colorStrip === 0)
        colorStrip = 1;
    else
        colorStrip = 0;
}

// To break mouvement of wagon
function brakeWagonFunction(config, valueBrake) {
    log.writeLine("mouveWagon function start");
    log.writeLine("speedWagon for mouve : " +decimalToHexString(speedWagon) +"%");

    cpt = 0;

    // low brake
    const interval = setInterval( function () {
        cpt += 10;
        if (cpt >= valueBrake)
            clearInterval( interval);
        i2cManager.sendData(0x03, decimalToHexString(valueBrake * config.coeffBrakeWagon));

    }, 500);

    log.writeLine("End of function brakeWagon");
}

// To change direction for mouvement of wagon
function changeDirectionFunction(indexDirection, config) {
    log.writeLine("changeDirection function start");

    i2cManager.sendData(0x02);
    if (mouveDirection == 0)
        mouveDirection = 1;
    else
        mouveDirection = 0;
        // break
        brakeWagonFunction(config, 100);
    }
    else if(indexDirection != mouveDirection) {
        brakeWagonFunction(config, 100);
        i2cManager.sendData(0x02);
        mouveDirection = indexDirection;
        //brakeWagonFunction(config, 0);
        mouveWagonFunction(config);
    }
    else {
        mouveWagonFunction(config);
    }
    
    log.writeLine("End of function changeDirection");
}

// Mouve rotation of camera
function mouveCameraFunction(config) {
    log.writeLine("mouveCamera function start");
    log.writeLine("speed for rotation camera : " +decimalToHexString(speedRotationCamera * config.coeffSpeedRotationCamera) +"%");

    i2cManager.sendData(0x04, decimalToHexString(speedRotationCamera * config.coeffSpeedRotationCamera));

    log.writeLine("End of function mouveCamera");
}

// To change direction for camera rotation
function changeDirectionCameraFunction() {
    log.writeLine("changeDirectionCamera function start");

    i2cManager.sendData(0x06);

    log.writeLine("End of function changeDirectionCamera");
}

// To cast decimal to hexa data
function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}