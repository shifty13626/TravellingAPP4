var log = require("./log.js");
var fs = require('fs');
var xml2js = require('xml2js');

// link functions of this file
module.exports = {
    LoadConfig : function(path) {
        return LoadConfigExecution(path);
    }
}

// Define class Config
let Config = class {
    constructor(portServer, i2cEnable, InitialSpeedLevel, TimeoutController, lengthRail, lengthStrip, pinFront, pinBack, coeffMouveWagon, coeffBrakeWagon, coeffSpeedRotationCamera) {
      this.portServer = portServer;
      this.i2cEnable = i2cEnable;
      this.InitialSpeedLevel = InitialSpeedLevel;
      this.TimeoutController = TimeoutController;
      this.lengthRail = lengthRail;
      this.lengthStrip = lengthStrip;
      this.pinFront = pinFront;
      this.pinBack = pinBack;
      this.coeffMouveWagon = coeffMouveWagon;
      this.coeffBrakeWagon = coeffBrakeWagon;
      this.coeffSpeedRotationCamera = coeffSpeedRotationCamera;
    }
};

// function to load all tag on xml file
function LoadConfigExecution(pathConfigFile) {
    log.writeLine("Load config of file : " +pathConfigFile);

    var contentConfig = fs.readFileSync(pathConfigFile).toString();
    log.writeLine("Content file config : \n" + contentConfig);

    var parser = new xml2js.Parser();
    var xmlDoc;
    parser.parseString(contentConfig, function (err, tempXmlDoc) {
        xmlDoc = tempXmlDoc;
    })

    // display all tags of the config file
    console.log(xmlDoc);

    // load tag on variables
    var portServer = xmlDoc.Config.portServer.toString();
    var i2cEnable = xmlDoc.Config.i2cEnable.toString();
    var initialSpeedLevel = xmlDoc.Config.InitialSpeedLevel.toString();
    var timeoutController = xmlDoc.Config.TimeoutController.toString();
    var lengthRail = xmlDoc.Config.lengthRail.toString();
    var lengthStrip = xmlDoc.Config.lengthStrip.toString();
    var gpioPinFront = xmlDoc.Config.pinMouveFront.toString();
    var gpioPinBack = xmlDoc.Config.pinMouveBack.toString();
    var coeffMouveWagon = xmlDoc.Config.coeffSpeedWagon.toString();
    var coeffBrakeWagon = xmlDoc.Config.coeffBrakeWagon.toString();
    var coeffSpeedRotationCamera = xmlDoc.Config.coeffSpeedRotationCamera.toString();

    // log all value loaded
    log.writeLine("port server : " +portServer);
    log.writeLine("I2c enable : " +i2cEnable);
    log.writeLine("Initial speed value : " +initialSpeedLevel);
    log.writeLine("Timout controller : " +timeoutController);
    log.writeLine("Length rail in centimeter : " +lengthRail);
    log.writeLine("Length of one strip : " +lengthStrip);
    log.writeLine("GPIO pin front mouvement : " +gpioPinFront);
    log.writeLine("GPIO pin back mouvement : " +gpioPinBack);
    log.writeLine("Coeff speed mouve wagon : " +coeffMouveWagon);
    log.writeLine("Coeff brake wagon : " +coeffBrakeWagon);
    log.writeLine("Coeff rotation camera : " +coeffSpeedRotationCamera);

    // return object config
    return new Config(portServer, i2cEnable, initialSpeedLevel,
        timeoutController, lengthRail, lengthStrip, gpioPinFront, gpioPinBack, coeffMouveWagon, coeffBrakeWagon, coeffSpeedRotationCamera);
}