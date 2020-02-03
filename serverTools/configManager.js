var log = require("./log.js");
var fs = require('fs');
var xml2js = require('xml2js');

module.exports = {
    LoadConfig : function(path) {
        return LoadConfigExecution(path);
    }
}

let Config = class {
    constructor(portServer, InitialSpeedLevel, TimeoutController, pinFront, pinBack, cameraWidth, cameraHeight, cameraQuality) {
      this.portServer = portServer;
      this.InitialSpeedLevel = InitialSpeedLevel;
      this.TimeoutController = TimeoutController;
      this.pinFront = pinFront;
      this.pinBack = pinBack;
      this.cameraWidth = cameraWidth;
      this.cameraHeight = cameraHeight;
      this.cameraQuality = cameraQuality;
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
    var gpioPinFront = xmlDoc.Config.pinMouveFront.toString();
    var gpioPinBack = xmlDoc.Config.pinMouveBack.toString();
    var cameraWidth = xmlDoc.Config.cameraWidth.toString();
    var cameraHeight = xmlDoc.Config.cameraHeight.toString();
    var cameraQuality = xmlDoc.Config.cameraQuality.toString();

    log.writeLine("port server : " +portServer);
    log.writeLine("Initial speed value : " +initialSpeedLevel);
    log.writeLine("Timout controller : " +timeoutController);
    log.writeLine("GPIO pin front mouvement : " +gpioPinFront);
    log.writeLine("GPIO pin back mouvement : " +gpioPinBack);
    log.writeLine("Camera width reseolution : " +cameraWidth);
    log.writeLine("Camera height reseolution : " +cameraHeight);
    log.writeLine("Camera quality reseolution : " +cameraQuality);

    return new Config(portServer, initialSpeedLevel,
        timeoutController, gpioPinFront, gpioPinBack,
        cameraWidth, cameraHeight, cameraQuality);
}