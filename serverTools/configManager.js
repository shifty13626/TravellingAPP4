var log = require("./log.js");
var fs = require('fs');
var xml2js = require('xml2js');

module.exports = {
    LoadConfig : function(path) {
        return LoadConfigExecution(path);
    }
}

let Config = class {
    constructor(portServer, InitialSpeedLevel, TimeoutController, lengthRail, lengthStrip, pinFront, pinBack, coeffMouveWagon, coeffBrakeWagon, coeffSpeedRotationCamera) {
      this.portServer = portServer;
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

function LoadConfigExecution(pathConfigFile) {
    log.writeLine("Load config of file : " +pathConfigFile);

    var contentConfig = fs.readFileSync(pathConfigFile).toString();
    log.writeLine("Content file config : \n" + contentConfig);

    var parser = new xml2js.Parser();
    var xmlDoc;
    parser.parseString(contentConfig, function (err, tempXmlDoc) {
        xmlDoc = tempXmlDoc;
    })

    console.log(xmlDoc);

    var portServer = xmlDoc.Config.portServer.toString();
    var initialSpeedLevel = xmlDoc.Config.InitialSpeedLevel.toString();
    var timeoutController = xmlDoc.Config.TimeoutController.toString();
    var lengthRail = xmlDoc.Config.lengthRail.toString();
    var lengthStrip = xmlDoc.config.lengthStrip;toString();
    var gpioPinFront = xmlDoc.Config.pinMouveFront.toString();
    var gpioPinBack = xmlDoc.Config.pinMouveBack.toString();
    var coeffMouveWagon = xmlDoc.Config.coeffSpeedWagon.toString();
    var coeffBrakeWagon = xmlDoc.Config.coeffBrakeWagon.toString();
    var coeffSpeedRotationCamera = xmlDoc.Config.coeffSpeedRotationCamera.toString();

    log.writeLine("port server : " +portServer);
    log.writeLine("Initial speed value : " +initialSpeedLevel);
    log.writeLine("Timout controller : " +timeoutController);
    log.writeLine("Length rail in centimeter : " +lengthRail);
    log.writeLine("Length of one strip : " +lengthStrip);
    log.writeLine("GPIO pin front mouvement : " +gpioPinFront);
    log.writeLine("GPIO pin back mouvement : " +gpioPinBack);
    log.writeLine("Coeff speed mouve wagon : " +coeffMouveWagon);
    log.writeLine("Coeff brake wagon : " +coeffBrakeWagon);
    log.writeLine("Coeff rotation camera : " +coeffSpeedRotationCamera);

    return new Config(portServer, initialSpeedLevel,
        timeoutController, lengthRail, lengthStrip, gpioPinFront, gpioPinBack, coeffMouveWagon, coeffBrakeWagon, coeffSpeedRotationCamera);
}