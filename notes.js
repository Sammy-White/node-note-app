const fs = require('fs')
const chalk = require('chalk')


const addNotes = (title, body) => {
    const notes = loadNotes()
    // const duplicateNote = notes.filter(note => note.title === title)

    const duplicateNote = notes.find(note => note.title === title)

    debugger
    
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse(title + ' already exist!'))
    }
   

}

const saveNotes = (note) => {

    const newNote = JSON.stringify(note)
    fs.writeFileSync('notes.json', newNote)
}


const loadNotes = () => {
   
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const JsonData = dataBuffer.toString()
        return JSON.parse(JsonData)
    } catch (e) {
        return []
    }

}

const removeNote = (title) => {

    const notes = loadNotes()
    // notes.filter(function(note, index){
    //     if (note.title === title){
    //         notes.splice(index, 1)
    //         console.log(chalk.green.inverse(("Note removed!")))
    //    }else{
    //         console.log(chalk.red.inverse(("No note found!")))
    //    }
    // })

    const noteToKeep = notes.filter(note => note.title !== title)

    if(notes.length > noteToKeep.length){
        console.log(chalk.green.inverse(("Note removed!")))
        saveNotes(noteToKeep)
    }else{
        console.log(chalk.red.inverse(("No note found!")))
    }    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("Your notes!"))
    notes.forEach(note => console.log(note.title))
   
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)
    if(noteToRead !== undefined){
        console.log('Title: ' + chalk.inverse(noteToRead.title))
        console.log('Body: ' + noteToRead.body)
    }else{
        console.log(chalk.red.inverse("No note found!"))
    }
}


module.exports = {
    addNotes: addNotes, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}