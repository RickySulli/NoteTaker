const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const {notes} = require('./db/db.json')

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON({notes}, null, 2)
    );
    return note;
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err,response)=> {
                if(err){
                    throw err  
                }else{
                    res.json(response)
                }; 
            });
});
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    fs.readFile('./db/db.json', "utf-8", (err,data) =>{
        if(err){
            throw err
        }else{
            const notes = JSON.parse(data);
             notes.push(newNote);
             console.log(notes);  
                notes.forEach(element => {
                    req.body.id = notes.length+1;
                });
                
             fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf-8', (err) => {
                 if(err) {
                     throw err;
                 }
                 console.log("Note has been saved!")
             })
        };
        
    }) 
    
    
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
});