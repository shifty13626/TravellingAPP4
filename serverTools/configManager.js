var log = require("./log.js");
var fs = require('fs');
var xml2js = require('xml2js');

module.exports = {
    LoadConfig : function(path) {
        return LoadConfigExecution(path);
    }
}

let Config = class {
    constructor(pathLogFile, InitialSpeedLevel, TimeoutController) {
      this.pathLogFile = pathLogFile;
      this.InitialSpeedLevel = InitialSpeedLevel;
      this.TimeoutController = TimeoutController;
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

    var pathLog = xmlDoc.Config.pathLogFile.toString();
    var initialSpeedLevel = xmlDoc.Config.InitialSpeedLevel.toString();
    var timeoutController = xmlDoc.Config.TimeoutController.toString();

    log.writeLine("Path log file : " +pathLog);
    log.writeLine("Initial speed value : " +initialSpeedLevel);
    log.writeLine("Timout controller : " +timeoutController);

    return new Config(pathLog, initialSpeedLevel, timeoutController);
}