
const fs = require('fs'); 

var fetchNotes = () => {
    try {
     return JSON.parse(fs.readFileSync('notes.txt'));    
    }   catch (err) {
      return [];
    }
}

var addingNote = (title, body) => {
 var notes = fetchNotes(); 


     var note = {
        title,
        body
    }; 
    //below is what prevents duplicate file names //
    var double = notes.filter((note) => note.title === title);
    
    if(double.length === 0){
        notes.push(note);

        fs.writeFileSync("notes.txt", JSON.stringify(notes));
    } else {
        console.log("STOP: Title already exists.");
     }
} 

var removeNote = (title) => { 
    var notes = fetchNotes(); 

    var filteredNotes = notes.filter((note) => note.title !== title);

    fs.writeFileSync("notes.txt", JSON.stringify(filteredNotes));
}

var readNote = (title) => {
    var notes = fetchNotes();

    var filteredNotes = notes.filter((note) => note.title === title);

    logNote(filteredNotes[0]);
    // this method below we can read but it wont actually call the note to be read
    // so instead were using this method above on line 39 //  
    // console.log(`Title: ${filteredNotes[0].title} Body: ${filteredNotes[0].body}`); // 
}

var getAll = () => {
    var notes = fetchNotes();

    notes.forEach((note) => logNote(note));
}

var logNote = (note) => { 
    console.log("************************");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addingNote, 
    removeNote,
    readNote,
    getAll 
}
 
