var log = require("./log.js");

var speed = 5;

module.exports = {
    setSpeed : function(value) {
        setSpeedValue(value);
    },
    getSpeed : function() {
        log.writeLine("Speed parameter :" +speed);
        return speed;
    },
    mouveBack : function() {
        mouveBackExecution();
    },
    mouveFront : function() {
        mouveFrontExecution();
    },
    mouveStop : function () {
        mouveStopExecution();
    }
    
}

// speed region
function setSpeedValue(value) {
    speed = value;
    log.writeLine("Speed mouve set to : " +speed);
}

function getSpeedValue() {
    log.writeLine("Speed parameter :" +speed);
    return speed;
}

// mouvement region
function mouveBackExecution(){
    log.writeLine("mouveBack function start");
}

function mouveFrontExecution() {
    log.writeLine("mouveFront function start");
}

function mouveStopExecution() {
    log.writeLine("mouveStop function start");
}