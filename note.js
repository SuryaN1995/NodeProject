const fs = require('fs')

var fetchNotes = () => {
    try {
        var data = fs.readFileSync('notes_write.json')
        return JSON.parse(data)
    } catch (exception) {
        return []
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes_write.json', JSON.stringify(notes))
}

var add = (title, body) => {
    var notes = fetchNotes()
    var note = {
        title,
        body
    }

    var duplicate = notes.filter((note) => note.title === title)
    if (duplicate.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
    
}

var remove = (title) =>{
    var notes = fetchNotes()
    var filteredNotes = notes.filter((note)=> note.title!==title)
    saveNotes(filteredNotes)
    return notes.length != filteredNotes.length
}

var get = (title) => {
    var notes = fetchNotes()
    return notes.filter((note)=> note.title == title )[0]
}

module.exports = {
    add,
    remove,
    get
}