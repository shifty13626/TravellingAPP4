var operations = ["move", "rotate"];
var directions = ["front", "stop", "back"];

class Command
{
    constructor(args) {            
        /*this.operation = null;
        this.direction = null;
        this.distance = null;
        this.speed = null;
        this.time = null;*/

        for(let i = 0; i < args.length; i++) {
            switch(getArgType(args[i])) {
                case("operation"): this.operation = args[i];
                break;
                case("direction"): this.direction = args[i];
                break;
                case("distance"): this.distance = parseFloat(args[i].slice(0, args[i].length-1), 2);
                break;
                case("speed"): this.speed = parseFloat(args[i].slice(0, args[i].length-1), 2);
                break;
                case("time"): this.time = parseFloat(args[i].slice(0, args[i].length-1), 2);
                break;
            }
        }
    }
}

function getArgType(arg) {
    if(operations.includes(arg)) return "operation";
    if(directions.includes(arg)) return "direction";
    if(arg.includes("m")) return "distance";
    if(arg.includes("s")) return "time";
    if(arg.includes("v")) return "speed";
}

function getCommands(script) {
    let errors = [];
    let commands = [];

    let txtCommands = script.split(";").filter(el => el != "" && el != null);

    for(let i = 0; i < txtCommands.length; i++) {
        let commandArgs = txtCommands[i].split(" ").filter(el => el != "" && el != null);;
        console.log(commandArgs);
        let command = new Command(commandArgs);
        commands.push(command);
    }

    return errors.length > 0 ? errors : commands;
}

function executeScript(script) {
    let commands = getCommands(script);
    commands.forEach(command => executeCommand(command));
}

var test = getCommands("move back 20s 45v; move front 80s 12v; move stop 9s 1.2m");
console.log(test);