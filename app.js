const data = require('yargs');
const argv = data.argv;
console.log(argv.body);
var command = argv._[0]

const note = require('./note.js');
if (command === "add") {
    var notes = note.add(argv.title, argv.body);
    if (notes) {
        console.log(notes.title)
    } else {
        console.log("Note tile is not unique")
    }
} else if (command === "remove") {
    var notes = note.remove(argv.title)
    notes ? console.log("Item removed") : console.log("No item removed")
}else if(command == "get"){
    var notes = note.get(argv.title)
    if(notes){
        console.log(notes.title)
    }else{
        console.log("node not found")
    }
}