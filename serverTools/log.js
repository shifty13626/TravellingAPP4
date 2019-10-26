var fs = require('fs');

module.exports = {
    writeLine : function (line){
        console.log(line);
        writeOnFileLog(line);
    },
    initSession : function(portNumber){
        var date = new Date();
        var message = "======================================" +"\n"
        + date.toString() +"\n"
        +"======================================" +"\n"
        +"Server started on port " +portNumber +"...";
        this.writeLine(message);
        writeOnFileLog(message);

    }
}

function writeOnFileLog(line) {
    fs.appendFileSync('./log.txt', line + "\n");
}