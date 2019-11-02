var fs = require('fs');

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
    fd = fs.openSync('./log.txt', 'a');
  	fs.appendFileSync(fd, line + "\n", 'utf8');
}