var fs = require('fs');
var path = require("path");

var logFileName = "";

// to export all method of this file to the other
module.exports = {
    initSession : function(portNumber){
        initSessionFunction(portNumber);
    },
    writeLine : function (line){
        writeLineFunction(line);
    },
}

// Title of log for nex execution
function initSessionFunction(portNumber) {
    var date = new Date();
        var message = "======================================" +"\n"
        + date.toString() +"\n"
        +"======================================" +"\n"
        +"Server started on port " +portNumber +"...";
        console.log(message);
        writeOnFileLog(message);
}

// To write a new line on the log file
function writeLineFunction(line) {
    var date = new Date();
    console.log(date.toString() + " || " + line);
    writeOnFileLog(date.toString() + " || " + line);
}

// to write last modification on the log file
function writeOnFileLog(line) {
    fd = fs.openSync(path.join(path.dirname(__dirname), "TravellingProject.log"), 'a');
      fs.appendFileSync(fd, line + "\n", 'utf8');
      //'./log.txt'
}