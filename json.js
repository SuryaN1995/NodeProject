var text = {
    name : "ram",
    lname : "rahim"
}
const fs = require('fs')
const textString = JSON.stringify(text)
fs.writeFileSync("notes.json",textString)
const read = fs.readFileSync("notes.json")
var data = JSON.parse(read)
console.log(data.name)