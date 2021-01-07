const chalk = require('chalk')
const { argv } = require('yargs')
const yargs = require('yargs')
const note = require('./notes')

//Customize yargs version
yargs.version("1.2.0")


//Create a note
yargs.command({
    command: "add",
    describe: "Add a note",
    builder:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        note.addNotes(argv.title, argv.body)
    }
})


//Remove a note
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder:{
        title:{
            describe: "Note title", 
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        note.removeNote(argv.title)
    }
})


//Read a note
yargs.command({
    command: "read",
    describe: 'Read a note',
    builder:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        note.readNote(argv.title)
    }
})


//List out all note
yargs.command({
    command: "list",
    describe: "List a note",
    handler(){
        note.listNotes()
    }
})


yargs.parse()
// console.log(yargs.argv)
