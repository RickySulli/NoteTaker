const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const notes = require('../../db/db.json');
const store = require('../../db/store')


router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
})

// router.get('/notes', (req, res) => {
//     fs.readFile('./db/db.json', 'utf-8', (err,data)=> {
//         // console.log(data);
//                 if(err){
//                     throw err  
//                 }else{
//                     res.json(data)
//                 }; 
//             });
// });


router.post('/notes', (req, res) => {
    const newNote = req.body;   
    fs.readFile('./db/db.json', "utf-8", (err,data) =>{
        if(err){
            throw err
        }else{
        const notes = JSON.parse(data);
            notes.push(newNote);
            // console.log(notes);  
            notes.forEach((obj, i) => {
            obj.id = i + 1;
        });
        
            fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf-8', (err) => {
                if(err) {
                    throw err;
                }
                // console.log("Note has been saved!");
            })
        };      
    }) 
});
router.delete("/notes/:id", (req,res) => {
    var id = req.params.id;
    notes.splice(id - 1, 1);
    notes.forEach(note, i => {
        note.id = i + 1;
    });
    fs.writeFile("./db/db.json", JSON.stringify(notes), 'utf-8', (err) => {
        if(err){
            throw err;
        }
        res.json(notes);
        console.log("You have deleted a note!");
    });
});
    
// const oldNotes = document.querySelector('oldNotes');
// document.body.appendChild(oldNotes);
    
    
    module.exports = router;