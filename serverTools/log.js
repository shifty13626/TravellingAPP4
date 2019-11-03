var fs = require('fs');
var path = require("path");

var logFileName = "";

module.exports = {
    writeLine : function (line){
        var date = new Date();
        console.log(date.toString() + " || " + line);
        writeOnFileLog(date.toString() + " || " + line);
    },
    initSession : function(portNumber){
        var date = new Date();
        var message = "======================================" +"\n"
        + date.toString() +"\n"
        +"======================================" +"\n"
        +"Server started on port " +portNumber +"...";
        console.log(message);
        writeOnFileLog(message);

    }
}


function writeOnFileLog(line) {
    fd = fs.openSync(path.join(path.dirname(__dirname), "TravellingProject.log"), 'a');
      fs.appendFileSync(fd, line + "\n", 'utf8');
      //'./log.txt'
}